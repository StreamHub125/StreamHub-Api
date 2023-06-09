import { model, PaginateModel, Schema } from "mongoose";
import { IModelModel, IModelSchema } from "../interfaces/IModel";
import MongoosePaginate from "mongoose-paginate-v2";
import { createCipher } from "node:crypto";
import md5 from "md5";
import DontEnv from "dotenv";

DontEnv.config();

const modelSchema: Schema = new Schema(IModelSchema, { timestamps: true });

modelSchema.plugin(MongoosePaginate);

modelSchema.methods.setPassword = function setPassword(password: string) {
  this.password = md5(password);
};

modelSchema.methods.setSecretKey = function setSecretKey() {
  let psk = process.env.PASSWORD_TO_SECRET_KEY || "";
  if (psk === "") return;
  let mykey = createCipher(`${this.name}${this.lastname}`, psk);
  let mystr = mykey.update(this.name, "utf8", "hex");
  mystr += mykey.final("hex");
  this.secret_key = mystr;
};

export default model<IModelModel, PaginateModel<IModelModel>>(
  "Model",
  modelSchema
);
