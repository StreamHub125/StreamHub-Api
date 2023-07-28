import { PaginatedResult } from "../interfaces/IDocumentsResponse";
import IService from "../interfaces/IService";
import { ITag } from "../interfaces/ITag";
import TagSchema from "../schemas/Tag";

export default class TagService implements IService<ITag> {
  async Create(item: ITag): Promise<ITag | null> {
    const tag: ITag = {
      ...item,
    };

    try {
      const newTag = new TagSchema(tag);
      const tagCreate = await newTag.save();

      return tagCreate;
    } catch (error) {
      return null;
    }
  }
  async Update(filter: object, update: object): Promise<ITag | null> {
    try {
      const tag = await TagSchema.findOneAndUpdate(filter, update);
      return tag;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const tagDelete = await TagSchema.findOneAndRemove({ _id: id });
      return tagDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<ITag | null> {
    try {
      const tag = await TagSchema.findById(id);
      return tag;
    } catch (error) {
      return null;
    }
  }
  async Find(
    query: object,
    set: object
  ): Promise<PaginatedResult<ITag> | null> {
    try {
      const tag = await TagSchema.paginate(query, set);
      return tag;
    } catch (error) {
      return null;
    }
  }
}
