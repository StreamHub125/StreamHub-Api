import { model, PaginateModel, Schema } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import { IStreamsModel, IStreamsSchema } from "../interfaces/IStreams";

const streamsSchema: Schema = new Schema(IStreamsSchema, {
  timestamps: true,
});

streamsSchema.plugin(MongoosePaginate);

export default model<IStreamsModel, PaginateModel<IStreamsModel>>(
  "Streams",
  streamsSchema
);
