import nodemailer from "nodemailer";

const nodemailerTransporter = nodemailer.createTransport({
  service: "postfix",
  host: "192.168.10.26",
  port: 25,
  secure: false,
  auth: {
    user: "sap@cbs.pe",
    pass: "PhR74r4$yu9(",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default nodemailerTransporter;
