import { PaginatedResult } from "../interfaces/IDocumentsResponse";
import { IModel } from "../interfaces/IModel";
import IService from "../interfaces/IService";
import ModelSchema from "../schemas/Model";
import { CloudinaryResponse, MulterImage, WID } from "../types";
import SaveImageService from "./SaveImageService/SaveImageService";
import ImagesSchema from "../schemas/Images";
import { IImages } from "../interfaces/IImages";

export default class ModelService implements IService<IModel> {
  saveImageService: SaveImageService;
  constructor() {
    this.saveImageService = new SaveImageService();
  }
  async Create(item: IModel): Promise<IModel> {
    const model: IModel = {
      ...item,
    };

    const newModel = new ModelSchema(model);
    const modelCreate = await newModel.save();

    return modelCreate;
  }
  async Update(filter: object, update: object): Promise<IModel | null> {
    try {
      const model = await ModelSchema.findOneAndUpdate(filter, update);
      return model;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const followDelete = await ModelSchema.findOneAndRemove({ _id: id });
      return followDelete;
    } catch (error) {
      return null;
    }
  }
  async Find(
    query: object,
    set: object
  ): Promise<PaginatedResult<IModel> | null> {
    try {
      const model = await ModelSchema.paginate(query, set);
      return model;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<WID<IModel> | null> {
    try {
      const model = await ModelSchema.findById(id);
      return model;
    } catch (error) {
      return null;
    }
  }

  SavePhotoSale(
    file: MulterImage,
    id: string,
    fn: (file: CloudinaryResponse | null) => void,
    error: (error: any) => void = (error) => {
      console.log(error);
    }
  ): void {
    const saveInModel = async (file: CloudinaryResponse | null) => {
      if (file === null) return;
      const image: IImages = {
        idModel: id,
        saveService: file,
      };
      const imagex = new ImagesSchema(image);
      await imagex.save();
      fn(file);
    };
    this.saveImageService.saveImage(file, id).then(saveInModel).catch(error);
  }

  SavePhotoAvatar(
    file: MulterImage,
    id: string,
    fn: (file: CloudinaryResponse | null) => void,
    error: (error: any) => void = (error) => {
      console.log(error);
    }
  ): void {
    const saveInModel = async (file: CloudinaryResponse | null) => {
      if (file === null) return;
      const md = new ModelService();
      const model = await md.FindById(id);
      if (model !== null) {
        if (model.avatar) {
          if (model.avatar.secure_url !== "") {
            new SaveImageService().deleteImage({
              ids: [
                {
                  ids: [model.avatar.public_id],
                  resource_type: model.avatar.resource_type,
                  type: model.avatar.cl_type,
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
          avatar: {
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
      const md = new ModelService();
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
