import * as path from 'path';
import { Image } from './images-types';

const MB = 500;
const fileSizeLimit = MB * 1024 * 1024; // 500 MB
const supportedFileExtensions = ['.png', '.jpg', '.jpeg'];

export const hasOversizedFiles = (images: Image[]): string[] => {
    const filesOverLimit: string[] = [];

    Object.keys(images).forEach((key) => {
        if (images[key].size > fileSizeLimit) {
            filesOverLimit.push(images[key].name);
        }
    });

    return filesOverLimit;
};

export const hasUnsupportedExtensions = (images: Image[]): boolean => {
    const fileExtensions: string[] = [];

    Object.keys(images).forEach((key) => {
        fileExtensions.push(path.extname(images[key].name));
    });

    return fileExtensions.some((fileExtension) => !supportedFileExtensions.includes(fileExtension));
};
