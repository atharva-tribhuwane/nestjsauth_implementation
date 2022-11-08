import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.models';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockedIpModule } from 'src/blocked_ip/blocked_ip.module';
import { BlockedIpController } from 'src/blocked_ip/blocked_ip.controller';
import { BlockedIpService } from 'src/blocked_ip/blocked_ip.service';
@Module({
  imports:[MongooseModule.forFeature([{name:'user', schema:UserSchema}]),BlockedIpModule ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
