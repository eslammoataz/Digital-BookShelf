import * as multer from "multer";
import { Request, Express } from "express"; // You may need to install @types/express for Express types
import PdfOnlyAllowedException from "../../v1/exceptions/PdfOnlyAllowedException";

const multerOptions = () => {
  const storage = multer.memoryStorage();

  const multerFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void
    ) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    }else cb(new PdfOnlyAllowedException(), false);

  };

  const upload = multer({ storage, fileFilter: multerFilter });
  return upload;
};

export const uploadSingleImage = (image: string) =>
  multerOptions().single(image);

export const uploadMixOfImages = (arrayOfImages: string[]) =>
  multerOptions().fields(arrayOfImages.map((fieldName) => ({
    name: fieldName,
    maxCount: 1, 
  })));
