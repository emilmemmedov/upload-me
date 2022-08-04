import {ImageObject} from "./objects/image-object";
import {PDFObject} from "./objects/PDF-object";
import {AbstractObject} from "./objects/abstract-object";

export class File implements AbstractFile {
    private object: AbstractObject;

    constructor(file: Express.Multer.File) {
        switch (file.mimetype){
            case 'image/jpeg':
                this.object = new ImageObject(file);
                break;
            default:
                this.object = new PDFObject(file);
        }
    }

    async upload() {
        await this.object.upload()
    }

    async delete() {
        await this.object.delete();
    }
}