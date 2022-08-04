import {
    Controller,
    Post, Req, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import {FileService} from "../services/file.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {HttpResponse} from "../../common/types/http.response";

@Controller('upload')
export class FileController {
    constructor(
        private readonly fileService: FileService,
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async upload(
        @UploadedFile() file: Express.Multer.File,
    ){
        await this.fileService.uploadFile(file);
        return HttpResponse.build('saved');
    }
}
