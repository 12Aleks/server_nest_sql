import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./tyeorm/entites/User";
import { UsersModule } from './users/users.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'testuser',
          password: 'testuser123',
          database: 'tutorial_db',
          entities: [
              User
          ],
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
