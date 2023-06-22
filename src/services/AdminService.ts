import md5 from "md5";
import { IAdmin } from "../interfaces/IAdmin";
import IService from "../interfaces/IService";
import AdminSchema from "../schemas/Admin";
import { PaginateResult } from "mongoose";

export default class AdminService implements IService<IAdmin> {
  constructor() {}
  async Create(item: IAdmin): Promise<IAdmin> {
    const admin: IAdmin = {
      ...item,
      password: md5(item.password),
    };

    const newAdmin = new AdminSchema(admin);
    const adminCreate = await newAdmin.save();

    return adminCreate;
  }
  async Update(filter: object, update: object): Promise<IAdmin | null> {
    try {
      const admin = await AdminSchema.findOneAndUpdate(filter, update);
      return admin;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const adminDelete = await AdminSchema.findOneAndRemove({ _id: id });
      return adminDelete;
    } catch (error) {
      return null;
    }
  }
  async Find(
    query: object,
    set: object
  ): Promise<PaginateResult<Document> | any | null> {
    try {
      const admin = await AdminSchema.paginate(query, set);
      return admin;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<IAdmin | null> {
    try {
      const admin = await AdminSchema.findById(id);
      return admin;
    } catch (error) {
      return null;
    }
  }
}
