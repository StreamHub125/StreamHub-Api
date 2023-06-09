import IService from "../interfaces/IService";
import { ITag } from "../interfaces/ITag";

export default class TagService implements IService<ITag> {
  Create(_item: ITag): Promise<ITag> {
    throw new Error("Method not implemented.");
  }
  Update(_filter: object, _update: object): Promise<ITag> {
    throw new Error("Method not implemented.");
  }
  Delete(_id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  FindById(_id: string): Promise<ITag | null> {
    throw new Error("Method not implemented.");
  }
  Find(): Promise<ITag[] | null> {
    throw new Error("Method not implemented.");
  }
}
