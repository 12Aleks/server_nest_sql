import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/service/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../tyeorm/entites/User";
import {Profile} from "../tyeorm/entites/Profile";
import {Post} from "../tyeorm/entites/Posts";

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
