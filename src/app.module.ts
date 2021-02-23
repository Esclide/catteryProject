import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from "./users/users.module";
import {CatsModule} from "./cats/cats.module";
import {AdvertisementsModule} from "./advertisements/advertisements.module";
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import {DatabaseModule} from "./database/database.module";
import {AuthModule} from "./auth/auth.module";
import {APP_FILTER} from "@nestjs/core";
import {ExceptionsLoggerFilter} from "../utils/filters/exceptions-logger.filter";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      })
    }),
    UsersModule,
    CatsModule,
    AdvertisementsModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: ExceptionsLoggerFilter,
  },],
})
export class AppModule {}
