import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as Joi from "joi";
import {FileModule} from "./file/file.module";
import { AwsModule } from './aws/aws.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {DimensionEntity} from "./aws/s3/models/dimension.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_BUCKET_NAME: Joi.string().required(),
        PORT: Joi.number(),
        PROJECT_NAME: Joi.string().required()
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: 'postgres',
        port: 5432,
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [DimensionEntity],
        synchronize: true,
      }),
    }),
    FileModule,
    AwsModule
  ],
})
export class AppModule {}
