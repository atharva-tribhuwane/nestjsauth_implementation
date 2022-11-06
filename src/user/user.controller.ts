import { Controller, Get, Body,Post } from '@nestjs/common';
import { User } from './user.models';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post('/createuser')
    async createuser(@Body() usersDto:User){
        return this.userService.createUser(usersDto);
    }

    async readUser(){
        return this.userService.find({},(err,userService)=>{
            if(err){
                console.log(err);
            }
            return user
        })
    }

    //https://github.com/thisissahulhameed/yt_nestjs_rest_curd/tree/master/src
}
