import {Module} from '@nestjs/common';
import { FileController } from './controllers/file.controller';
import { FileService } from './services/file.service';
import {AwsModule} from "../aws/aws.module";

@Module({
  imports: [AwsModule],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
