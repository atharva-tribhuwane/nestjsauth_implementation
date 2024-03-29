import { Controller, Get, Body,Post, Delete, Param , Patch, Req, Res, Inject} from '@nestjs/common';
import { User } from './user.models';
import {UserService } from './user.service';
import { UpdateUserDto } from './updateusers.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
        ) {}
    @Post('/createuser')
    async createuser(@Body() usersDto:User, @Req() req, @Res() res){
        // if(req.ip === "::ffff:127.0.0.1"){
        //     return res.status(401).send({response:"Cannot Access This Endpoint"})
        //  }
        let user = this.userService.createUser(usersDto,req,res);
        this.logger.verbose('Verbose:User Created and this is verbose Log','abcd');
        this.logger.warn('WARN:User Created and this is verbose Log','abcd');
        return user;
    }

    @Get()
    async readuser(@Req() req, @Res() res){
        this.logger.verbose('Verbose:User Created and this is verbose Log','abcd');
        this.logger.warn('WARN:User Created and this is verbose Log','abcd');
        return this.userService.readUser(req,res);
    }
    
    @Delete("/deleteuser/:id")
    async deleteuser(@Param('id') id:string, @Req() req, @Res() res){
        return this.userService.deleteUser(id,req,res);
    }

    @Patch('/updateuser/:id')
    async updateuser(@Param('id') id:string, @Body() user:UpdateUserDto, @Req() req, @Res() res){
        console.log('id',id);
        return this.userService.updateUser(Object(id), user,req,res);
    }

    // @Post('/blockip/:ip')
    // async blockip(@Param('ip') ip:string, @Req() req, @Res() res){

    // }

}


//Note:- As per the MongoDB docs, ObjectIds must be 24 hexadecimal bytes only so do-not try to use _id parameter since monogodb  checks and if it finds _id is not of 24 hex.
// it will return exception error so add new id using uuid. and try to use that id instead od mongodb's "_id";