import { model, Schema } from "mongoose";
import { IModelModel } from "../interfaces/IModel";
import md5 from "md5";

const modelSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cc: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    photos: [String],
  },
  { timestamps: true }
);

modelSchema.methods.setPassword = function setPassword(password: string) {
  this.password = md5(password);
};

export default model<IModelModel>("Model", modelSchema);
