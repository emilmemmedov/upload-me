import {HttpException, Injectable} from '@nestjs/common';
import { S3 } from 'aws-sdk';
import {ConfigService} from "@nestjs/config";
import {AbstractObject} from "../../../file/components/abstract-object";
import sizeOf from "image-size";
import {ImageObject} from "../../../file/components/objects/image-object";
import {IDimension} from "../../../common/interfaces/dimension.interface";
import {ErrorCodesEnum} from "../../../common/exception/error-codes.enum";
import {InjectRepository} from "@nestjs/typeorm";
import {DimensionEntity} from "../models/dimension.entity";
import {Repository} from "typeorm";
import {SharpService} from "nestjs-sharp";
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
    private s3: S3;
    private bucketName;

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(DimensionEntity)
        private dimensionRepo: Repository<DimensionEntity>,
        private readonly sharpService: SharpService
    ) {
        this.s3 = new S3();
        this.bucketName = configService.get('AWS_BUCKET_NAME');
    }

    async upload(object: AbstractObject){
        let buffer = object.getBuffer();
        if (object instanceof ImageObject) {
            const defaultDimensions:IDimension[] = await this.getDimensions();
            const dimensions = sizeOf(buffer);

            const realDimensions = this.getRealDimensions(defaultDimensions,dimensions);
            const image = this.sharpService.edit(buffer).resize(realDimensions.width,realDimensions.height);
            buffer = await image.toBuffer();
        }

        await this.s3.upload({
            Bucket: this.bucketName,
            Body: buffer,
            Key: `${uuid()}-${object.getOriginalName()}`
        }).promise();
    }

    getRealDimensions(defaultDimensions, dimensions){ //FIXME functionality should be changed according to business logic
        if (!defaultDimensions.length){
            throw new HttpException(ErrorCodesEnum.DIMENSIONS_NOT_FOUND,400);
        }

        let realDimension: IDimension = null;

        for (const defaultDimension of defaultDimensions){
            if (dimensions.width >= defaultDimension.width){
                realDimension =  defaultDimension;
                break;
            }
        }

        if (!realDimension){
            realDimension = defaultDimensions[0];
        }

        return realDimension;
    }

    async getDimensions(): Promise<IDimension[]> {
        return await this.dimensionRepo.find({
            order: {
                width: 'desc'
            }
        });
    }
}
