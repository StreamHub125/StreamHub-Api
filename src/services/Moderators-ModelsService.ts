import { IModeratorsModels } from "../interfaces/IModerators-Models";
import IService from "../interfaces/IService";
import ModeratorsModelSchema from "../schemas/Moderators-Models";

export default class ModeratorsModelsService
  implements IService<IModeratorsModels>
{
  async Create(item: IModeratorsModels): Promise<IModeratorsModels> {
    const mms: IModeratorsModels = {
      ...item,
    };

    const newMms = new ModeratorsModelSchema(mms);
    const mmsCreate = await newMms.save();

    return mmsCreate;
  }
  async Update(
    filter: object,
    update: object
  ): Promise<IModeratorsModels | null> {
    try {
      const mms = await ModeratorsModelSchema.findOneAndUpdate(filter, update);
      return mms;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const mmsDelete = await ModeratorsModelSchema.findOneAndRemove({
        _id: id,
      });
      return mmsDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<IModeratorsModels | null> {
    try {
      const mms = await ModeratorsModelSchema.findById(id);
      return mms;
    } catch (error) {
      return null;
    }
  }
  async Find(query: object, set: object): Promise<any | null> {
    try {
      const mms = await ModeratorsModelSchema.paginate(query, set);
      return mms;
    } catch (error) {
      return null;
    }
  }
}
