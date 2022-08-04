import {
    Controller,
    Post, Req, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import {FileService} from "../services/file.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('file')
export class FileController {
    constructor(
        private readonly fileService: FileService,
    ) {}


    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(
        @UploadedFile() file: Express.Multer.File,
    ){
        await this.fileService.uploadFile(file);
    }

    // async savePhotos(photos: FileUploadEntity[]): Promise<any> {
    //     return Promise.all(photos.map(photo => {
    //         const filePath = `${moment().format('YYYYMMDD-hhmmss')}${Math.floor(Math.random() * (1000))}.jpg`
    //         const params = {
    //             Body: photo.buffer,
    //             Bucket: Constants.BUCKET_NAME,
    //             Key: filePath,
    //         }
    //         return new Promise((resolve) => {
    //             this.client.putObject(params, (err: any, data: any) => {
    //                 if (err) {
    //                     logger.error(`Photo upload failed [err=${err}]`)
    //                     ExceptionHelper.throw(ErrorCodes.SERVER_ERROR_UNCAUGHT_EXCEPTION)
    //                 }
    //                 logger.info(`Photo upload succeeded [filePath=${filePath}]`)
    //                 return resolve()
    //             })
    //         })
    //     }))
    // }
    //
    // async getPhoto(photoId: PhotoId): Promise<AWS.S3.Body> {
    //     const object: S3.GetObjectOutput = await this.getObject(S3FileKey.of(`${Constants.S3_PHOTO_PATH}/${photoId.value}`))
    //         .catch(() => ExceptionHelper.throw(ErrorCodes.RESOURCE_NOT_FOUND_PHOTO)) as S3.GetObjectOutput
    //     logger.info(JSON.stringify(object.Body))
    //     return object.Body
    // }
    //
    // async getObject(s3FilePath: S3FileKey): Promise<S3.GetObjectOutput> {
    //     logger.info(`Retrieving object from S3 s3FilePath=${s3FilePath.value}]`)
    //     return this.client.getObject({
    //         Bucket: Constants.BUCKET_NAME,
    //         Key: s3FilePath.value
    //     }).promise()
    //         .catch(err => {
    //             logger.error(`Could not retrieve object from S3 [err=${err}]`)
    //             ExceptionHelper.throw(ErrorCodes.SERVER_ERROR_UNCAUGHT_EXCEPTION)
    //         }) as S3.GetObjectOutput
    // }
}
