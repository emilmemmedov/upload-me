import {AbstractObject} from "./abstract-object";

export class ImageObject implements AbstractObject{
    private file: Express.Multer.File;

    constructor(file:Express.Multer.File) {
        this.file = file;
    }

    async upload(){
        console.log(this.file.size);
    }

    async delete(){}
}