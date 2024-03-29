import { ICredentialsPayment } from "../interfaces/ICredentialsPayment";
import { PaginatedResult } from "../interfaces/IDocumentsResponse";
import IService from "../interfaces/IService";
import CredentialPaymentSchema from "../schemas/CredentialsPayment";

export default class CredentialsPaymentService
  implements IService<ICredentialsPayment>
{
  async Create(item: ICredentialsPayment): Promise<ICredentialsPayment | null> {
    const cp: ICredentialsPayment = {
      ...item,
    };

    try {
      const newCp = new CredentialPaymentSchema(cp);
      const cpCreate = await newCp.save();

      return cpCreate;
    } catch (error) {
      return null;
    }
  }
  async Update(
    filter: object,
    update: object
  ): Promise<ICredentialsPayment | null> {
    try {
      const cp = await CredentialPaymentSchema.findOneAndUpdate(filter, update);
      return cp;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const cpDelete = await CredentialPaymentSchema.findOneAndRemove({
        _id: id,
      });
      return cpDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<ICredentialsPayment | null> {
    try {
      const cp = await CredentialPaymentSchema.findById(id);
      return cp;
    } catch (error) {
      return null;
    }
  }
  async Find(
    query: object,
    set: object
  ): Promise<PaginatedResult<ICredentialsPayment> | null> {
    try {
      const cp = await CredentialPaymentSchema.paginate(query, set);
      return cp;
    } catch (error) {
      return null;
    }
  }
}
