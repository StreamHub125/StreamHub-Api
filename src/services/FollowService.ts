import { PaginatedResult } from "../interfaces/IDocumentsResponse";
import { IFollow } from "../interfaces/IFollow";
import IService from "../interfaces/IService";
import FollowSchema from "../schemas/Follow";

export default class FollowService implements IService<IFollow> {
  async Create(item: IFollow): Promise<IFollow> {
    const follow: IFollow = {
      ...item,
    };

    const newFollow = new FollowSchema(follow);
    const followCreate = await newFollow.save();

    return followCreate;
  }
  async Update(
    filter: object,
    update: Partial<IFollow>
  ): Promise<IFollow | null> {
    try {
      const follow = await FollowSchema.findOneAndUpdate(filter, update);
      return follow;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any | null> {
    try {
      const followDelete = await FollowSchema.findOneAndRemove({ _id: id });
      return followDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<IFollow | null> {
    try {
      const follow = await FollowSchema.findById(id);
      return follow;
    } catch (error) {
      return null;
    }
  }
  async Find(
    query: object,
    set: object
  ): Promise<PaginatedResult<IFollow> | null> {
    try {
      const follow = await FollowSchema.paginate(query, set);
      return follow;
    } catch (error) {
      return null;
    }
  }
  async FindS(query: object): Promise<any | null> {
    try {
      const follow = await FollowSchema.find(query).exec();
      return follow;
    } catch (error) {
      return null;
    }
  }
}
