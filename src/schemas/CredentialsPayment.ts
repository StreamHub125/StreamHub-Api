import { model, PaginateModel, Schema } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import {
  ICredentialsPaymentModel,
  ICredentialsPaymentSchema,
} from "../interfaces/ICredentialsPayment";

const credentialsPaymentSchema: Schema = new Schema(ICredentialsPaymentSchema, {
  timestamps: true,
});

credentialsPaymentSchema.plugin(MongoosePaginate);

export default model<
  ICredentialsPaymentModel,
  PaginateModel<ICredentialsPaymentModel>
>("CredentialsPayment", credentialsPaymentSchema);
