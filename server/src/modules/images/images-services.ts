import * as path from 'path';
import { CallbackErrorOnly } from '../../types';
import { UploadFilesParams } from './images-types';
import { hasOversizedFiles, hasUnsupportedExtensions } from './images-utils';

export const uploadFiles = (params: UploadFilesParams, cb: CallbackErrorOnly) => {
    const {
        data: { carOfferId },
        files
    } = params;

    if (!carOfferId) {
        return cb(new Error('Invalid input.'));
    }

    if (!files?.images) {
        return cb(new Error('Missing files.'));
    }

    const images = Array.isArray(files.images) ? files.images : [files.images];
    const oversizedFiles = hasOversizedFiles(images);

    if (oversizedFiles.length) {
        return cb(new Error(`Upload failed. Some files are over the file size limit: ${oversizedFiles.join(', ')}.`));
    }

    if (hasUnsupportedExtensions(images)) {
        return cb(new Error('Upload failed. Some files have unsupported extensions.'));
    }

    Object.keys(images).forEach((key) => {
        const filePath = path.join(__dirname, 'files', `offer${carOfferId}`, images[key].name);

        images[key].mv(filePath, (error: Error) => {
            if (error) {
                return cb(error);
            }
        });
    });

    return cb();
};
