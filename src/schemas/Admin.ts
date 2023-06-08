import { model, PaginateModel, Schema } from "mongoose";
import { IAdminModel, IAdminSchema } from "../interfaces/IAdmin";
import MongoosePaginate from "mongoose-paginate-v2";
import md5 from "md5";

const adminSchema: Schema = new Schema(IAdminSchema, { timestamps: true });

adminSchema.plugin(MongoosePaginate);

adminSchema.methods.setPassword = function setPassword(password: string) {
  this.password = md5(password);
};

export default model<IAdminModel, PaginateModel<IAdminModel>>(
  "Admin",
  adminSchema
);
