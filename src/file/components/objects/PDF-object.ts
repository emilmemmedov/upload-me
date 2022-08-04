import {AbstractObject} from "./abstract-object";

export class PDFObject implements AbstractObject{
    private file: Express.Multer.File;

    constructor(file: Express.Multer.File) {
        this.file = file;
    }
    async upload(){}
    async delete(){}
}