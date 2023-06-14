import IService from "../interfaces/IService";
import { IViewer } from "../interfaces/IViewer";

export default class ViewerService implements IService<IViewer> {
  constructor() {}
  Create(_item: IViewer): Promise<IViewer> {
    throw new Error("Method not implemented.");
  }
  Update(_filter: object, _update: object): Promise<IViewer> {
    throw new Error("Method not implemented.");
  }
  Delete(_id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  FindById(_id: string): Promise<IViewer | null> {
    throw new Error("Method not implemented.");
  }
  Find(): Promise<IViewer[] | null> {
    throw new Error("Method not implemented.");
  }
}
