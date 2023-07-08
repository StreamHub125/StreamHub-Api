import { model, PaginateModel, Schema } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import { IHistoryModel, IHistorySchema } from "../interfaces/IHistory";

const historySchema: Schema = new Schema(IHistorySchema, {
  timestamps: true,
});

historySchema.plugin(MongoosePaginate);

export default model<IHistoryModel, PaginateModel<IHistoryModel>>(
  "History",
  historySchema
);
