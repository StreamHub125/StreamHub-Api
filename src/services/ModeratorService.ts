import { IModerator } from "../interfaces/IModerator";
import IService from "../interfaces/IService";
import ModeratorSchema from "../schemas/Moderator";

export default class ModeratorService implements IService<IModerator> {
  constructor() {}
  async Create(item: IModerator): Promise<IModerator> {
    const moderator: IModerator = {
      ...item,
    };

    const newModerator = new ModeratorSchema(moderator);
    const moderatorCreate = await newModerator.save();

    return moderatorCreate;
  }
  async Update(filter: object, update: object): Promise<IModerator | null> {
    try {
      const moderator = await ModeratorSchema.findOneAndUpdate(filter, update);
      return moderator;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const moderatorDelete = await ModeratorSchema.findOneAndRemove({
        _id: id,
      });
      return moderatorDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<IModerator | null> {
    try {
      const moderator = await ModeratorSchema.findById(id);
      return moderator;
    } catch (error) {
      return null;
    }
  }
  async Find(query: object, set: object): Promise<any | null> {
    try {
      const moderator = await ModeratorSchema.paginate(query, set);
      return moderator;
    } catch (error) {
      return null;
    }
  }
}
