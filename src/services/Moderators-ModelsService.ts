import { IModeratorsModels } from "../interfaces/IModerators-Models";
import IService from "../interfaces/IService";

export default class ModeratorsModelsService
  implements IService<IModeratorsModels>
{
  Create(_item: IModeratorsModels): Promise<IModeratorsModels> {
    throw new Error("Method not implemented.");
  }
  Update(_filter: object, _update: object): Promise<IModeratorsModels> {
    throw new Error("Method not implemented.");
  }
  Delete(_id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  FindById(_id: string): Promise<IModeratorsModels | null> {
    throw new Error("Method not implemented.");
  }
  Find(): Promise<IModeratorsModels[] | null> {
    throw new Error("Method not implemented.");
  }
}
