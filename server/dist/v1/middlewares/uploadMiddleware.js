"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMixOfImages = exports.uploadSingleImage = void 0;
const multer = require("multer");
const PdfOnlyAllowedException_1 = require("../../v1/exceptions/PdfOnlyAllowedException");
const multerOptions = () => {
    const storage = multer.memoryStorage();
    const multerFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        }
        else
            cb(new PdfOnlyAllowedException_1.default(), false);
    };
    const upload = multer({ storage, fileFilter: multerFilter });
    return upload;
};
const uploadSingleImage = (image) => multerOptions().single(image);
exports.uploadSingleImage = uploadSingleImage;
const uploadMixOfImages = (arrayOfImages) => multerOptions().fields(arrayOfImages.map((fieldName) => ({
    name: fieldName,
    maxCount: 1,
})));
exports.uploadMixOfImages = uploadMixOfImages;
//# sourceMappingURL=uploadMiddleware.js.map