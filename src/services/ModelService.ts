import { IModel } from "../interfaces/IModel";
import IService from "../interfaces/IService";
import ModelSchema from "../schemas/Model";

export default class ModelService implements IService<IModel> {
  constructor() {}
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
  async Find(query: object, set: object): Promise<any | null> {
    try {
      const model = await ModelSchema.paginate(query, set);
      return model;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<IModel | null> {
    try {
      const model = await ModelSchema.findById(id);
      return model;
    } catch (error) {
      return null;
    }
  }
}
