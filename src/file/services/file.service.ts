import { Injectable } from '@nestjs/common';
import {File} from "../components/file";

@Injectable()
export class FileService {
    async uploadFile(file: Express.Multer.File){
        const object = new File(file);
        await object.upload();
    }
}
