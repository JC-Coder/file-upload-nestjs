import { Controller, FileTypeValidator, HttpStatus, MaxFileSizeValidator, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('app')
export class AppController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req,file,cb) => {
                // storing the file original name
                const filename = path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();

                // storing the file extension 
                const extension = path.parse(file.originalname).ext;
                cb(null, `${filename}${extension}`);
            }
        })
    }))
    // sending a response 
    fileUpload(@Res() res, @UploadedFile(
        // adding validation to the file 
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({maxSize: 1000000}),
                new FileTypeValidator({ fileType: 'png'})
            ]
        })
    ) file){
        // returniing a Http response to the user with the file path 
        return res.status(HttpStatus.OK).json({
            success: true,
            data: file.path
        })
    }
}
