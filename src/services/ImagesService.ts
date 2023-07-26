import { PaginatedResult } from "../interfaces/IDocumentsResponse";
import { IImages } from "../interfaces/IImages";
import IService from "../interfaces/IService";
import ImagesSchema from "../schemas/Images";

export default class ImagesService implements IService<IImages> {
  async Create(item: IImages): Promise<IImages> {
    const cm: IImages = {
      ...item,
    };

    const newIm = new ImagesSchema(cm);
    const imCreate = await newIm.save();

    return imCreate;
  }
  async Update(filter: object, update: object): Promise<IImages | null> {
    try {
      const im = await ImagesSchema.findOneAndUpdate(filter, update);
      return im;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const imDelete = await ImagesSchema.findOneAndRemove({
        _id: id,
      });
      return imDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<IImages | null> {
    try {
      const im = await ImagesSchema.findById(id);
      return im;
    } catch (error) {
      return null;
    }
  }
  async Find(
    query: object,
    set: object
  ): Promise<PaginatedResult<IImages> | null> {
    try {
      const ims = await ImagesSchema.paginate(query, set);
      return ims;
    } catch (error) {
      return null;
    }
  }
}
