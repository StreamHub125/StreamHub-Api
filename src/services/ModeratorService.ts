import { PaginatedResult } from "../interfaces/IDocumentsResponse";
import { IModerator } from "../interfaces/IModerator";
import IService from "../interfaces/IService";
import ModeratorSchema from "../schemas/Moderator";
import { CloudinaryResponse, MulterImage, WID } from "../types";
import SaveImageService from "./SaveImageService/SaveImageService";

export default class ModeratorService implements IService<IModerator> {
  saveImageService: SaveImageService;
  constructor() {
    this.saveImageService = new SaveImageService();
  }
  async Create(item: IModerator): Promise<IModerator | null> {
    const moderator: IModerator = {
      ...item,
    };

    try {
      const newModerator = new ModeratorSchema(moderator);
      const moderatorCreate = await newModerator.save();

      return moderatorCreate;
    } catch (error) {
      return null;
    }
  }
  async Update(filter: object, update: object): Promise<IModerator | null> {
    try {
      const moderator = await ModeratorSchema.findOneAndUpdate(filter, update);
      return moderator;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const moderatorDelete = await ModeratorSchema.findOneAndRemove({
        _id: id,
      });
      return moderatorDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<WID<IModerator> | null> {
    try {
      const moderator = await ModeratorSchema.findById(id);
      return moderator;
    } catch (error) {
      return null;
    }
  }
  async Find(
    query: object,
    set: object
  ): Promise<PaginatedResult<IModerator> | null> {
    try {
      const moderator = await ModeratorSchema.paginate(query, set);
      return moderator;
    } catch (error) {
      return null;
    }
  }

  SavePhotoVerificated(
    file: MulterImage,
    id: string,
    fn: (file: CloudinaryResponse | null) => void,
    error: (error: any) => void = (error) => {
      console.log(error);
    }
  ): void {
    const saveInModel = async (file: CloudinaryResponse | null) => {
      if (file === null) return;
      const md = new ModeratorService();
      const model = await md.FindById(id);
      if (model !== null) {
        if (model.verificatePhoto) {
          if (model.verificatePhoto.secure_url !== "") {
            new SaveImageService().deleteImage({
              ids: [
                {
                  ids: [model.verificatePhoto.public_id],
                  resource_type: model.verificatePhoto.resource_type,
                  type: model.verificatePhoto.cl_type,
                },
              ],
            });
          }
        }
        // Eliminar la imagen
      }
      await md.Update(
        { _id: id },
        {
          verificatePhoto: {
            public_id: file.public_id,
            secure_url: file.secure_url,
            url: file.url,
            cl_type: file.type,
            resource_type: file.resource_type,
          },
        }
      );
      fn(file);
    };
    this.saveImageService.saveImage(file, id).then(saveInModel).catch(error);
  }
}
