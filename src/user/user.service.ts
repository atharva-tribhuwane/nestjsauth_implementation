import { Inject, Injectable, Param, Res } from '@nestjs/common';
import { User, UserDocument } from './user.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { BlockedIpService } from 'src/blocked_ip/blocked_ip.service';
@Injectable()
export class UserService  {
    constructor(
        @InjectModel('user') private readonly userModel: Model<UserDocument>
    ) { }

    //Injecting blocked ip to check if IP is in block list 

    @Inject(BlockedIpService)
    private readonly blockedipservice: BlockedIpService;


    ///////////////////////////////////////////
    async createUser(user: User, req, res): Promise<User | string> {
        let iep = await this.blockedipservice.inblocklist(req.ip);
        // if(!iep){
        //     return res.status(403).send({ response:"This IP Cannot Access This Endpoint"});
        // }
        let usser = await this.userModel.findOne({ email: user.email });
        if (usser) {
            return res.status(409).send({ response: "User Already Exist" })
        }
        let password: string = bcrypt.hashSync(user.password, 10);
        user["password"] = password;

        const id: string = uuidv4();
        user = { ...user, id }
        const newUser = new this.userModel(user);
        newUser.save();
        return res.status(200).send({ response: "User Registered Successfully!" });
    }

    async readUser(req, res): Promise<User | string> {
        return this.userModel.find({})
            .then((user) => {
                if (user.length === 0) {
                    // return  res.status(200).send({response:"User Registered Successfully!"});
                    return "No Users"
                }
                // console.log(user);
                return res.status(200).send({ response: user });
            })
            .catch((err) => { return err });
    }

    async deleteUser(ied: string, req, res) {
        let user = await this.userModel.find({ id: ied })
        console.log(user);
        if (user.length <= 0) {
            return res.status(404).send({ response: "User Not Found" });
        }
        try {
            await this.userModel.deleteOne({ id: ied })
            return res.status(200).send({ response: "User Deleted Successfully!" });
        }
        catch (err) {
            return err;
        }
    }

    async updateUser(ied: string, usser: User, req, res) {
        let user = await this.userModel.find({ id: ied })
        console.log(user);
        if (user.length <= 0) {
            return res.status(404).send({ response: "User Not Found" });
        }
        try {
            let response = await this.userModel.findOneAndUpdate({ id: ied }, { $set: usser });
            console.log(response);
            return res.status(200).send({ response: "User Updated ", data: response });
        }
        catch (err) {
            return err;
        }
    }

    // async blockip(ip:string, req,res){
    //     let iep = await this.userModel.find({ ip: ip });
    //     if(iep){
    //         return res.status(400).send({response:"Already in Blocklist"});
    //     }
    //     try{
    //         await 
    //     }
    // }

}
// @Injectable()
// export class IPService {
//     constructor(
//         @InjectModel('blockedip') private readonly ipModel: Model<IPDocument>
//         // @InjectModel('blockedip') private readonly IPModel: Model<IPDocument >
//     ) { }
// }
