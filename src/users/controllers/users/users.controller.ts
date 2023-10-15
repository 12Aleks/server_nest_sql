import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreateUserDto} from "../../dtos/CreateUser.dto";
import {UsersService} from "../../services/service/users.service";

@Controller('users')
export class UsersController {
    constructor(private userServices: UsersService){}
    @Get()
    async getUsers(){
     return await this.userServices.findUser();
    }

    @Post()
    createUser(@Body() dto: CreateUserDto){
       this.userServices.createUser(dto)
    }
}
