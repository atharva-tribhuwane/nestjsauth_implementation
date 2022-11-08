import { Controller, Get, Body,Post, Delete, Param , Patch, Req, Res} from '@nestjs/common';
import { IP } from './blocked_ip.models';
import { BlockedIpService } from './blocked_ip.service';

@Controller('blockip')
export class BlockedIpController {
    constructor(private readonly ipservice:BlockedIpService){}

    @Post()
        async ipblock(@Body() ip:IP, @Req() req, @Res() res){
            // return res.status(200).send("Hello world");
            return this.ipservice.blockip(ip,req,res);
        }
    }

