import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {

    @Prop()
    userId: string;

    @Prop()
    username: string;

    @Prop()
    password: string;

    // @Prop({ type: Date, default: Date.now })
    // createdAt: Date;

    // @Prop()
    // updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);