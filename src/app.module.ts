import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import * as Joi from "joi";
import {FileModule} from "./file/file.module";
import { AwsModule } from './aws/aws.module';

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
    FileModule,
    AwsModule
  ],
})
export class AppModule {}
