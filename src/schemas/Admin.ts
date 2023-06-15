import { model, PaginateModel, Schema } from "mongoose";
import { IAdminModel, IAdminSchema } from "../interfaces/IAdmin";
import MongoosePaginate from "mongoose-paginate-v2";

const adminSchema: Schema = new Schema(IAdminSchema, { timestamps: true });

adminSchema.plugin(MongoosePaginate);

export default model<IAdminModel, PaginateModel<IAdminModel>>(
  "Admin",
  adminSchema
);
