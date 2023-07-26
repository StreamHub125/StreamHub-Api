import { CloudinaryResponse, DeleteImageProps, MulterImage } from "../../types";
import CloudinaryService from "../cloudinaryService";

interface PropsDeleteImage {
  ids?: Array<DeleteImageProps>;
}

export default class SaveImageService {
  private ims: CloudinaryService;
  constructor() {
    this.ims = new CloudinaryService();
  }

  async saveImage(
    file: MulterImage,
    id: string
  ): Promise<CloudinaryResponse | null> {
    return this.ims.middlewareFileUpload({ file, userName: id });
  }

  async deleteImage({ ids }: PropsDeleteImage): Promise<void> {
    if (ids) {
      for (let i = 0; i < ids.length; i++) {
        this.ims.middlewareFileDelete(ids[i]);
      }
    }
  }
}
