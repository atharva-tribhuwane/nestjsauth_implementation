import { Module } from '@nestjs/common';
import { BlockedIpController } from './blocked_ip.controller';
import { BlockedIpService } from './blocked_ip.service';
import { IPSchema } from './blocked_ip.models';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports:[MongooseModule.forFeature([{name:'blockedip', schema:IPSchema}])],
  providers: [BlockedIpService],
  controllers: [BlockedIpController],
  exports:[BlockedIpService]
})
export class BlockedIpModule {

}
