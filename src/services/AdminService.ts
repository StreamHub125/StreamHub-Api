import { IAdmin } from "../interfaces/IAdmin";
import IService from "../interfaces/IService";

export default class AdminService implements IService<IAdmin> {
  constructor() {}
  Create(_item: IAdmin): Promise<IAdmin> {
    throw new Error("Method not implemented.");
  }
  Update(_filter: object, _update: object): Promise<IAdmin> {
    throw new Error("Method not implemented.");
  }
  Delete(_id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  Find(): Promise<IAdmin[] | null> {
    throw new Error("Method not implemented.");
  }
  FindById(_id: string): Promise<IAdmin | null> {
    throw new Error("Method not implemented.");
  }
}
