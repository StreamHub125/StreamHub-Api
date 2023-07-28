import { ICountMasterModels } from "../interfaces/ICountMaster-Models";
import { PaginatedResult } from "../interfaces/IDocumentsResponse";
import IService from "../interfaces/IService";
import CountMasterModelsSchema from "../schemas/CountMaster-Models";

export default class CountMasterModelsService
  implements IService<ICountMasterModels>
{
  async Create(item: ICountMasterModels): Promise<ICountMasterModels | null> {
    const cmm: ICountMasterModels = {
      ...item,
    };

    try {
      const newCmm = new CountMasterModelsSchema(cmm);
      const cmmCreate = await newCmm.save();

      return cmmCreate;
    } catch (error) {
      return null;
    }
  }
  async Update(
    filter: object,
    update: object
  ): Promise<ICountMasterModels | null> {
    try {
      const cmm = await CountMasterModelsSchema.findOneAndUpdate(
        filter,
        update
      );
      return cmm;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const mmsDelete = await CountMasterModelsSchema.findOneAndRemove({
        _id: id,
      });
      return mmsDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<ICountMasterModels | null> {
    try {
      const mms = await CountMasterModelsSchema.findById(id);
      return mms;
    } catch (error) {
      return null;
    }
  }
  async Find(
    query: object,
    set: object
  ): Promise<PaginatedResult<ICountMasterModels> | null> {
    try {
      const mms = await CountMasterModelsSchema.paginate(query, set);
      return mms;
    } catch (error) {
      return null;
    }
  }
}
