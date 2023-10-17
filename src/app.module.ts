import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./tyeorm/entites/User";
import {Profile} from "./tyeorm/entites/Profile";
 import { UsersModule } from './users/users.module';
import {Post} from "./tyeorm/entites/Posts";


@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'testuser',
          password: 'testuser123',
          database: 'tutorial_db',
          entities: [ User, Profile, Post],
          synchronize: true,
      }),
      UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// mysql -u testuser -p
// Show DATABASES;
// USE db_name;
// Select * From table_name;

//CREATE DATABASE matomo_db_name_here;
//CREATE USER 'matomo'@'localhost' IDENTIFIED WITH mysql_native_password BY 'my-strong-password-here';
//GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON matomo_db_name_here.* TO 'matomo'@'localhost';


//ERROR [ExceptionHandler] REFERENCES command denied to user 'testuser'@'localhost' for table 'tutorial_db.user_profiles'
//GRANT REFERENCES ON tutorial_db.user_profiles TO 'testuser'@'localhost';
//GRANT ALL PRIVILEGES ON tutorial_db.* TO 'testuser'@'localhost';
// FLUSH PRIVILEGES;

//SHOW GRANTS FOR 'testuser'@'localhost';