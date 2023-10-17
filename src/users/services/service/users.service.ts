import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../../tyeorm/entites/User";
import {Repository} from "typeorm";
import {CreateUserParams, CreateUserPostParams, CreateUserProfileParams, UpdateUserParams} from "../../../utils/types";
import {CreateUserProfileDto} from "../../dtos/CreateUserProfile.dto";
import {Profile} from "../../../tyeorm/entites/Profile";
import {Post} from "../../../tyeorm/entites/Posts";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository:Repository<Post>
    ){}

    findUser(): Promise<User[]>{
      return this.userRepository.find({relations: ['profile', 'posts']});
    }

    createUser(dto: CreateUserParams): Promise<User>{
          const newUser:User = this.userRepository.create({
              ...dto,
              createAt: new Date(),
          })
         return this.userRepository.save(newUser);
    }

    updateUser(id: number, dto: UpdateUserParams){
       return  this.userRepository.update({id}, {...dto})
    }

    deleteUser(id: number){
        return this.userRepository.delete({id})
    }

   async createUserProfile(id: number, dto: CreateUserProfileParams){
        const user = await this.userRepository.findOneBy({id});

        if(!user) throw new HttpException('User not found. Cannot create Profile', HttpStatus.BAD_REQUEST);

        const newProfile =  this.profileRepository.create({...dto});
        const savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile;
        return this.userRepository.save(user);
    };

    async createUserPost(id: number, dto: CreateUserPostParams){
        const user = await this.userRepository.findOneBy({id});
        if(!user) throw new HttpException('User not found. Cannot create Profile', HttpStatus.BAD_REQUEST);

        const newPost = this.postRepository.create({
            ...dto,
            createPostAt: new Date(),
            user
        });

        return  await this.postRepository.save(newPost);

    }
}
