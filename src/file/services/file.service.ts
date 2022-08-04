import { Injectable } from '@nestjs/common';
import {S3Service} from "../../aws/s3/services/s3.service";
import {BaseObject} from "../components/base-object";

@Injectable()
export class FileService {
    constructor(private readonly s3Service: S3Service) {
    }
    async uploadFile(file: Express.Multer.File){
        const object = new BaseObject(file);

        await this.s3Service.upload(object.getObject());
    }
}
