import userModel from "../models/user/user.model";
import checkPass from "./checkPass";

const models = new userModel();

const valiedPassword = async (password: string) => {
  const validpass = await checkPass(password);
  if (validpass.length < 3) {
    return {
      status: "failed",
      message: "validation error",
      data: {
        type: "password",
        info: validpass,
      },
    };
  }
  return false;
};

export const valiedEmail = async (email: string, table: string) => {
  if (await models.checkEmail(email, table)) {
    return {
      status: "failed",
      message: "validation error",
      data: {
        type: "email",
        info: "your E-mail is not available",
      },
    };
  }
  return false;
};

export default valiedPassword;
