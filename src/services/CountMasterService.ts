import { ICountMaster } from "../interfaces/ICountMaster";
import { PaginatedResult } from "../interfaces/IDocumentsResponse";
import IService from "../interfaces/IService";
import CountMasterSchema from "../schemas/CountMaster";

export default class CountMasterService implements IService<ICountMaster> {
  async Create(item: ICountMaster): Promise<ICountMaster | null> {
    const cm: ICountMaster = {
      ...item,
    };

    try {
      const newCm = new CountMasterSchema(cm);
      const cmCreate = await newCm.save();

      return cmCreate;
    } catch (error) {
      return null;
    }
  }
  async Update(filter: object, update: object): Promise<ICountMaster | null> {
    try {
      const cm = await CountMasterSchema.findOneAndUpdate(filter, update);
      return cm;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const cmDelete = await CountMasterSchema.findOneAndRemove({
        _id: id,
      });
      return cmDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<ICountMaster | null> {
    try {
      const cm = await CountMasterSchema.findById(id);
      return cm;
    } catch (error) {
      return null;
    }
  }
  async Find(
    query: object,
    set: object
  ): Promise<PaginatedResult<ICountMaster> | null> {
    try {
      const cm = await CountMasterSchema.paginate(query, set);
      return cm;
    } catch (error) {
      return null;
    }
  }
}
