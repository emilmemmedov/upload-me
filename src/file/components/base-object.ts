import {AbstractObject} from "./abstract-object";
import {ImageObject} from "./objects/image-object";
import {PDFObject} from "./objects/PDF-object";
import {HttpException} from "@nestjs/common";

export class BaseObject {
    private object: AbstractObject;

    constructor(file: Express.Multer.File) {
        switch (file.mimetype){
            case 'image/jpeg':
                this.object = new ImageObject(file);
                break;
            case 'application/pdf':
                this.object = new PDFObject(file);
                break;
            default:
                throw new HttpException('file format not supported',400);
        }
    }

    getObject(){
        return this.object;
    }
}