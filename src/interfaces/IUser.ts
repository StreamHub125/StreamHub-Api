export interface IUser {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  cc: string;
}

export interface IUserWAvatar extends IUser {
  avatar?: string;
}

export const IUserSchema = {
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
};

export const IUserSchemaWAvatar = {
  ...IUserSchema,
  avatar: {
    type: String,
    required: false,
  },
};
