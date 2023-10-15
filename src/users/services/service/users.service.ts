import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../../tyeorm/entites/User";
import {Repository} from "typeorm";
import {CreateUserParams} from "../../../utils/types";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    findUser(): Promise<User[]>{
      return this.userRepository.find();
    }

    createUser(dto: CreateUserParams): Promise<User>{
          const newUser:User = this.userRepository.create({
              ...dto,
              createAt: new Date(),
          })

         return this.userRepository.save(newUser);


    }
}
