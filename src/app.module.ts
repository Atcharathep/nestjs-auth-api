import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/databasetest')],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
