import { IAdminVerificated } from "../interfaces/IAdmin-Verificated";
import { PaginatedResult } from "../interfaces/IDocumentsResponse";
import IService from "../interfaces/IService";
import AdminVerificatedSchema from "../schemas/Admin-Verificated";

export default class AdminVerificatedService
  implements IService<IAdminVerificated>
{
  async Create(item: IAdminVerificated): Promise<IAdminVerificated | null> {
    const avs: IAdminVerificated = {
      ...item,
    };

    try {
      const newAvs = new AdminVerificatedSchema(avs);
      const avsCreate = await newAvs.save();

      return avsCreate;
    } catch (error) {
      return null;
    }
  }
  async Update(
    filter: object,
    update: object
  ): Promise<IAdminVerificated | null> {
    try {
      const avs = await AdminVerificatedSchema.findOneAndUpdate(filter, update);
      return avs;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const avsDelete = await AdminVerificatedSchema.findOneAndRemove({
        _id: id,
      });
      return avsDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<IAdminVerificated | null> {
    try {
      const avs = await AdminVerificatedSchema.findById(id);
      return avs;
    } catch (error) {
      return null;
    }
  }
  async Find(
    query: object,
    set: object
  ): Promise<PaginatedResult<IAdminVerificated> | null> {
    try {
      const avs = await AdminVerificatedSchema.paginate(query, set);
      return avs;
    } catch (error) {
      return null;
    }
  }
}
