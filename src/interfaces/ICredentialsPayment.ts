import { Document } from "mongoose";

export interface ICredentialsPayment {
  idUser: string;
  /* Implementar */
}

export interface ICredentialsPaymentM extends Omit<ICredentialsPayment, "fn"> {}
export interface ICredentialsPaymentModel
  extends Document,
    ICredentialsPaymentM {}

export const ICredentialsPaymentSchema = {
  idUser: {
    type: String,
    required: true,
  },
};

export const keysOfICredentialsPayment = ["idUser"];
