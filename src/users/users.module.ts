import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/service/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../tyeorm/entites/User";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
