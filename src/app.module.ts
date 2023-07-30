import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { BlockedIpModule } from './blocked_ip/blocked_ip.module';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
const { combine, timestamp, label, printf, json } = winston.format;
// const logger: LoggerConfig = new LoggerConfig();
const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] --> [${level}] --> ${message}`;
});
@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
    dbName: 'users',
  }),
  WinstonModule.forRoot({
    level: 'debug',
    // format: winston.format.simple(),
    format: combine(
      timestamp({ format: "HH:mm:ss" }),
      myFormat
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: 'errors.log',

      })
      // other transports...
    ],
  }),
    UserModule,
    BlockedIpModule
  ]
})
export class AppModule { }
