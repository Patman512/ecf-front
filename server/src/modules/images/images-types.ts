import * as fileUpload from 'express-fileupload';

export type Files = fileUpload.FileArray;

export type Image = fileUpload.UploadedFile;

export interface UploadFilesParams {
    data: { carOfferId: number };
    files?: Files | null;
}
