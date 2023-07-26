import multer, { Multer, Options } from "multer";
import { extname, join } from "path";

// single for one file and array for multifiles y se envia el nombre de como se llama debe de ser File o Files para muchos
export default class MulterInject {
  multer: Multer;
  imgAc: string[] = ["image/jpg", "image/jpeg", "image/png"];
  folderSave: string | null;

  constructor(
    configMulter: Omit<Options, "dest" | "limits" | "fileFilter" | "storage">,
    folderUpload: string | null,
    _imgAc?: string[]
  ) {
    if (_imgAc !== null) {
      _imgAc?.forEach((e) => {
        this.imgAc.push(e);
      });
    }
    if (folderUpload !== null) {
      this.folderSave = folderUpload;
    } else {
      this.folderSave = "upload";
    }

    this.multer = multer({
      storage: multer.diskStorage({
        ...configMulter,
        destination: join("src/", this.folderSave),
        filename: (_req, file, cb) => {
          const fileExtension = extname(file.originalname);
          const fileName = file.originalname
            .split(fileExtension)[0]
            .replace(/\s/g, "")
            .toLocaleLowerCase();

          cb(null, `${fileName}-${Date.now()}${fileExtension}`);
        },
      }),
      limits: {
        fieldSize: 10000000,
      },
      fileFilter: (_req, file, cb) => {
        if (this.imgAc.includes(file.mimetype)) cb(null, true);
        else cb(new Error(`Only Types ${this.imgAc.join("")} mimetypes`));
      },
    });
  }
}
