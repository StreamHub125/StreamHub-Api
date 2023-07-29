import { ICode } from "../interfaces/ICode";
import { PaginatedResult } from "../interfaces/IDocumentsResponse";
import IService from "../interfaces/IService";
import CodeSchema from "../schemas/Code";

export default class CodeService implements IService<ICode> {
  async Create(item: ICode): Promise<ICode | null> {
    const cmmd: ICode = {
      ...item,
    };

    try {
      const newCmmd = new CodeSchema(cmmd);
      const cmmdCreate = await newCmmd.save();

      return cmmdCreate;
    } catch (error) {
      return null;
    }
  }
  async Update(filter: object, update: object): Promise<ICode | null> {
    try {
      const cmmd = await CodeSchema.findOneAndUpdate(filter, update);
      return cmmd;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const mmsdDelete = await CodeSchema.findOneAndRemove({
        _id: id,
      });
      return mmsdDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<ICode | null> {
    try {
      const mmsd = await CodeSchema.findById(id);
      return mmsd;
    } catch (error) {
      return null;
    }
  }
  async Find(
    query: object,
    set: object
  ): Promise<PaginatedResult<ICode> | null> {
    try {
      const mmsd = await CodeSchema.paginate(query, set);
      return mmsd;
    } catch (error) {
      return null;
    }
  }
  async FindByCode(code: string): Promise<any | null> {
    try {
      const mmsd = await CodeSchema.find({ code });
      if (mmsd === null) {
        return mmsd;
      }
      return mmsd;
    } catch (error) {
      return null;
    }
  }
}
