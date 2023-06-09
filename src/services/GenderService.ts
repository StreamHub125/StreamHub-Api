import { IGender } from "../interfaces/IGender";
import IService from "../interfaces/IService";

export default class GenderService implements IService<IGender> {
  Create(_item: IGender): Promise<IGender> {
    throw new Error("Method not implemented.");
  }
  Update(_filter: object, _update: object): Promise<IGender> {
    throw new Error("Method not implemented.");
  }
  Delete(_id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  FindById(_id: string): Promise<IGender | null> {
    throw new Error("Method not implemented.");
  }
  Find(): Promise<IGender[] | null> {
    throw new Error("Method not implemented.");
  }
}
