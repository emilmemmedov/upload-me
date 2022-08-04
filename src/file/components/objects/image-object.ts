import {AbstractObject} from "../abstract-object";

export class ImageObject implements AbstractObject {
    private file: Express.Multer.File;

    constructor(file:Express.Multer.File) {
        this.file = file;
    }

    getBuffer() {
        return this.file.buffer;
    }

    getOriginalName() {
        return this.file.originalname;
    }

    getSize() {
        return this.file.size;
    }
}