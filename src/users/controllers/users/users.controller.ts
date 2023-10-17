import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {CreateUserDto} from "../../dtos/CreateUser.dto";
import {UsersService} from "../../services/service/users.service";
import {UpdateUserDto} from "../../dtos/UpdateUser.dto";
import {CreateUserProfileDto} from "../../dtos/CreateUserProfile.dto";
import {CreateUserPostDto} from "../../dtos/CreateUserPost.dto";

@Controller('users')
export class UsersController {
    constructor(private userServices: UsersService){}
    @Get()
    async getUsers(){
     return await this.userServices.findUser();
    }

    @Post()
    async createUser(@Body() dto: CreateUserDto){
       await this.userServices.createUser(dto)
    }

    @Put(':id')
    async updateUserById(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto ){
       await this.userServices.updateUser(id , dto)
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number){
        await this.userServices.deleteUser(id)
    }

    @Post(':id/profiles')
    createUserProfile(@Param('id', ParseIntPipe) id: number,@Body() dto: CreateUserProfileDto){
      return this.userServices.createUserProfile(id, dto)
    }

    @Post(':id/posts')
    createUserPost(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateUserPostDto){
      return this.userServices.createUserPost(id, dto)
    }
}
