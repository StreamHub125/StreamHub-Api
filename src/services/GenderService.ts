import { PaginatedResult } from "../interfaces/IDocumentsResponse";
import { IGender } from "../interfaces/IGender";
import IService from "../interfaces/IService";
import GenderSchema from "../schemas/Gender";

export default class GenderService implements IService<IGender> {
  async Create(item: IGender): Promise<IGender | null> {
    const gender: IGender = {
      ...item,
    };

    try {
      const newGender = new GenderSchema(gender);
      const genderCreate = await newGender.save();

      return genderCreate;
    } catch (error) {
      return null;
    }
  }
  async Update(
    filter: object,
    update: Partial<IGender>
  ): Promise<IGender | null> {
    try {
      const gender = await GenderSchema.findOneAndUpdate(filter, update);
      return gender;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const genderDelete = await GenderSchema.findOneAndRemove({ _id: id });
      return genderDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<IGender | null> {
    try {
      const gender = await GenderSchema.findById(id);
      return gender;
    } catch (error) {
      return null;
    }
  }
  async Find(
    query: object,
    set: object
  ): Promise<PaginatedResult<IGender> | null> {
    try {
      const gender = await GenderSchema.paginate(query, set);
      return gender;
    } catch (error) {
      return null;
    }
  }
}
