import { model, PaginateModel, Schema } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import {
  ICountMasterModel,
  ICountMasterSchema,
} from "../interfaces/ICountMaster";

const credentialsPaymentSchema: Schema = new Schema(ICountMasterSchema, {
  timestamps: true,
});

credentialsPaymentSchema.plugin(MongoosePaginate);

export default model<ICountMasterModel, PaginateModel<ICountMasterModel>>(
  "CountMaster",
  credentialsPaymentSchema
);
