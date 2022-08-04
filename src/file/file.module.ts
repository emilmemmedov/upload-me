import {Module} from '@nestjs/common';
import { FileController } from './controllers/file.controller';
import { FileService } from './services/file.service';
import {AwsModule} from "../aws/aws.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      AwsModule,
      ConfigModule,
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
