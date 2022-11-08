import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type IPDocument = IP & Document;

@Schema()
export class IP{
    @Prop()
    ip:string;
}

export const IPSchema = SchemaFactory.createForClass(IP);