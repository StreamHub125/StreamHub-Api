import { IFollow } from "../interfaces/IFollow";
import IService from "../interfaces/IService";

export default class FollowService implements IService<IFollow> {
  Create(_item: IFollow): Promise<IFollow> {
    throw new Error("Method not implemented.");
  }
  Update(_filter: object, _update: object): Promise<IFollow> {
    throw new Error("Method not implemented.");
  }
  Delete(_id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  FindById(_id: string): Promise<IFollow | null> {
    throw new Error("Method not implemented.");
  }
  Find(): Promise<IFollow[] | null> {
    throw new Error("Method not implemented.");
  }
}
