import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import {ConfigService} from "@nestjs/config";
import {AbstractObject} from "../../../file/components/abstract-object";

@Injectable()
export class S3Service {
    private s3: S3;
    private bucketName;

    constructor(
        private readonly configService: ConfigService
    ) {
        this.s3 = new S3();
        this.bucketName = configService.get('AWS_BUCKET_NAME');
    }

    async upload(object: AbstractObject){

        // const uploadResult = await this.s3.upload({
        //     Bucket: this.bucketName,
        //     Body: object.getBuffer(),
        //     Key: `${uuid()}-${object.getOriginalName()}`
        // }).promise();

        // console.log(uploadResult);
    }
}
