export interface IUser {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  cc: string;
}
export interface AvatarType {
  public_id: string;
  secure_url: string;
  url: string;
  cl_type: string;
  resource_type: string;
}

export interface IUserWAvatar extends IUser {
  avatar?: AvatarType;
}

export const keysOfIUser = [
  "name",
  "lastname",
  "username",
  "email",
  "password",
  "cc",
];

export const keysOfIUserWAvatar = [...keysOfIUser, "avatar"];

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
    type: {
      public_id: {
        type: String,
        required: false,
        default: "",
      },
      secure_url: {
        type: String,
        required: false,
        default: "",
      },
      url: {
        type: String,
        required: false,
        default: "",
      },
      cl_type: {
        type: String,
        required: false,
        default: "",
      },
      resource_type: {
        type: String,
        required: false,
        default: "",
      },
    },
    default: {},
  },
};

export const UserDefault: IUser = {
  name: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  cc: "",
};

export const UserWAvatarDefault: IUserWAvatar = {
  ...UserDefault,
  avatar: {
    public_id: "",
    secure_url: "",
    url: "",
    cl_type: "",
    resource_type: "",
  },
};
