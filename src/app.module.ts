import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { BlockedIpModule } from './blocked_ip/blocked_ip.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
    dbName: 'users',
  }), UserModule, BlockedIpModule]
})
export class AppModule {}
