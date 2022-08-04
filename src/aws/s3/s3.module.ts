import {forwardRef, Module} from '@nestjs/common';
import { S3Service } from './services/s3.service';
import {ConfigModule} from "@nestjs/config";
import {FileModule} from "../../file/file.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DimensionEntity} from "./models/dimension.entity";
import {SharpModule} from "nestjs-sharp";

@Module({
  imports: [
      SharpModule,
      ConfigModule,
      TypeOrmModule.forFeature([DimensionEntity])
  ],
  providers: [S3Service],
  exports: [S3Service]
})
export class S3Module {}
