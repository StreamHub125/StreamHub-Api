import { v2 } from "cloudinary";
// import { Request, Response } from "express";
import Dotenv from "dotenv";
import fs from "fs-extra";
import ImageService, {
  PropsMiddleWareFile,
} from "../../interfaces/ImageService";
import { DeleteImageProps } from "../../types";

Dotenv.config();

interface PropsDelete {
  resources: Array<string>;
  type: string;
  resource_type: string;
}

export default class CloudinaryService implements ImageService {
  // static instance: CloudinaryService | null;
  constructor() {}
  postDelete(_data: any): void {
    // Tratamiento de la data despues de ser eliminada
    /**
     * MuckUp
     * {
        deleted: { '64c01ba955afc38ca54456ad/k43rnt0y37g2ovhfhkan': 'deleted' },
        deleted_counts: {
          '64c01ba955afc38ca54456ad/k43rnt0y37g2ovhfhkan': { original: 1, derived: 0 }
        },
        partial: false,
        rate_limit_allowed: 500,
        rate_limit_reset_at: 2023-07-25T20:00:00.000Z,
        rate_limit_remaining: 497
      }
     *  */
  }

  async postUpload(path: string): Promise<void> {
    await fs.unlink(path);
  }

  private async upload(file: string, folderName: string): Promise<any> {
    try {
      const result = await v2.uploader.upload(`./src/upload/${file}`, {
        folder: folderName,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  private async delete({
    resources,
    type,
    resource_type,
  }: PropsDelete): Promise<any> {
    try {
      // Resource ==> ["64bf4ecc50c700b4061bd206/kpbsawqcuq0qzugqu4jb"]
      const response = await v2.api.delete_resources(resources, {
        type,
        resource_type,
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async middlewareFileUpload<CloudinaryResponse>({
    file,
    userName = "UI",
  }: PropsMiddleWareFile): Promise<CloudinaryResponse | null> {
    try {
      const upload = await this.upload(file.filename, userName);
      await this.postUpload(file.path);
      return upload;
    } catch (error) {
      console.log(JSON.stringify(error));
      return null;
    }
  }

  middlewareFileDelete(data: DeleteImageProps): boolean {
    try {
      const result: Array<any> = [];
      data.ids.forEach(async (e) => {
        const aa = await this.delete({
          resource_type: data.resource_type,
          type: data.type,
          resources: [e],
        });
        result.push(aa);
      });

      setTimeout(() => {
        result.forEach((r) => {
          new CloudinaryService().postDelete(r);
        });
      }, 10000);

      return true;
    } catch (error) {
      return false;
    }
  }
}
