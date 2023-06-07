"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
class MulterInject {
    multer;
    imgAc = ['image/jpg', 'image/png'];
    folderSave;
    constructor(configMulter, folderUpload, _imgAc) {
        if (_imgAc !== null) {
            _imgAc?.forEach(e => {
                this.imgAc.push(e);
            });
        }
        if (folderUpload !== null) {
            this.folderSave = folderUpload;
        }
        else {
            this.folderSave = 'upload';
        }
        this.multer = (0, multer_1.default)({
            storage: multer_1.default.diskStorage({
                destination: (0, path_1.join)('src/', this.folderSave),
                filename: (_req, file, cb) => {
                    const fileExtension = (0, path_1.extname)(file.originalname);
                    const fileName = file.originalname.split(fileExtension)[0];
                    cb(null, `${fileName}-${Date.now()}${fileExtension}`);
                }
            }),
            limits: {
                fieldSize: 10000000
            },
            fileFilter: (_req, file, cb) => {
                if (this.imgAc.includes(file.mimetype))
                    cb(null, true);
                else
                    cb(new Error(`Only Types ${this.imgAc.join('')} mimetypes`));
            },
            ...configMulter
        });
    }
}
exports.default = MulterInject;
