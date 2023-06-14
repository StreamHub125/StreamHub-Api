import { IModerator } from "../interfaces/IModerator";
import IService from "../interfaces/IService";

export default class ModeratorService implements IService<IModerator> {
  constructor() {}
  Create(_item: IModerator): Promise<IModerator> {
    throw new Error("Method not implemented.");
  }
  Update(_filter: object, _update: object): Promise<IModerator> {
    throw new Error("Method not implemented.");
  }
  Delete(_id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  FindById(_id: string): Promise<IModerator | null> {
    throw new Error("Method not implemented.");
  }
  Find(): Promise<IModerator[] | null> {
    throw new Error("Method not implemented.");
  }
}
