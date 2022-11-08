import { Injectable } from '@nestjs/common';
import { IP, IPDocument } from './blocked_ip.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlockedIpService {
    constructor(
        @InjectModel('blockedip') private readonly IPModel: Model<IPDocument >
    ) { }

    async blockip(ip:IP,req,res):Promise<string>{
        let exists = await this.IPModel.findOne({ip:ip.ip});
        if(exists){
            return res.status(400).send({response:"IP Already Exists in BlockList"})
        }
        const newIP = new this.IPModel(ip);
        newIP.save();
        return  res.status(200).send({response:"IP Added to Block List"});
    }

    async inblocklist(ip:IP):Promise<Boolean>{
        let exists = await this.IPModel.findOne({ip:ip.ip});
        if(exists){
            return true
        }
        return false;
    }
}
