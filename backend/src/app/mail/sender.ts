import config from "../config";
import mailOptions from "../types/MailOption.type";
import transporter from "./Gmail";

const mail = (options: mailOptions) => {
  options.from = config.EmailGmail;
  const result = {
    status: "waiting",
    data: {},
  };
  transporter.sendMail(options, function (error, info) {
    if (error) {
      result.status = "failed";
      result.data = error;
    } else {
      result.status = "success";
      result.data = info;
    }
  });

  return result;
};

export const verifyAcc = async (_link: string, to: string) => {
  const result = {
    status: "waiting",
    data: {},
  };

  const from = config.EmailGmail as string;
  const mailDetails: mailOptions = {
    from: from,
    to: to as string,
    subject: "Verify Account",
    text: "hello",
  };

  await transporter.sendMail(mailDetails, function (error, info) {
    if (error) {
      result.status = "failed";
      result.data = error;
      return result;
    } else {
      result.status = "success";
      result.data = info;
      return result;
    }
  });

  // return result;
};

export default mail;
