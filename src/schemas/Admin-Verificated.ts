import { model, PaginateModel, Schema } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import {
  AdminVerificatedModel,
  IAdminVerificatedSchema,
} from "../interfaces/IAdmin-Verificated";

const adminVerificatedSchema: Schema = new Schema(IAdminVerificatedSchema, {
  timestamps: true,
});

adminVerificatedSchema.plugin(MongoosePaginate);

export default model<
  AdminVerificatedModel,
  PaginateModel<AdminVerificatedModel>
>("Admin-Verificate", adminVerificatedSchema);
