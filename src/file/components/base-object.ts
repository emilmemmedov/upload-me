import {AbstractObject} from "./abstract-object";
import {ImageObject} from "./objects/image-object";
import {PDFObject} from "./objects/PDF-object";
import {HttpException} from "@nestjs/common";
import {ErrorCodesEnum} from "../../common/exception/error-codes.enum";

export class BaseObject {
    private readonly object: AbstractObject;

    constructor(file: Express.Multer.File) {
        switch (file.mimetype){
            case 'image/jpeg':
                this.object = new ImageObject(file);
                break;
            case 'application/pdf':
                this.object = new PDFObject(file);
                break;
            default:
                throw new HttpException(ErrorCodesEnum.FILE_FORMAT,400);
        }
    }

    getObject(){
        return this.object;
    }

    validate(maxSize: number){
        if (this.object.getSize() > maxSize){
            throw new HttpException(ErrorCodesEnum.FILE_MAX_SIZE,400);
        }
    }
}