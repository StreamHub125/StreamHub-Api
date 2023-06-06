import { IModel } from "../interfaces/IModel";
import IService from "../interfaces/IService";

export default class ModelService implements IService<IModel> {
  constructor() {}
  Create(_item: IModel): Promise<IModel> {
    throw new Error("Method not implemented.");
  }
  Update(_filter: object, _update: object): Promise<IModel> {
    throw new Error("Method not implemented.");
  }
  Delete(_id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  Find(_id: string): Promise<IModel | null> {
    throw new Error("Method not implemented.");
  }
}
