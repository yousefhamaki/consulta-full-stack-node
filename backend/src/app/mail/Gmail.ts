import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.EmailGmail,
    pass: config.GmailPassword,
  },
});

export default transporter;
