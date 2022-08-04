import { Injectable } from '@nestjs/common';
import {S3Service} from "../../aws/s3/services/s3.service";
import {BaseObject} from "../components/base-object";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class FileService {
    constructor(
        private readonly s3Service: S3Service,
        private readonly configService: ConfigService,
    ) {
    }
    async uploadFile(file: Express.Multer.File){
        const object = new BaseObject(file);

        object.validate(this.configService.get('AWS_MAX_File_SIZE'));

        await this.s3Service.upload(object.getObject());
    }
}
