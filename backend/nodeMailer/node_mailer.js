const nodemailer = require("nodemailer");
require("dotenv").config();

const THRESHOLD_PERCENTAGE = 60;

const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE OF STOCK",
  LOWEST_PRICE: "LOWEST PRICE",
  THRESHOLD_MET: "THRESHOLD MET",
};

const transporter = nodemailer.createTransport({
  pool: true,
  service: "hotmail",
  port: 2525,
  auth: {
    user: "piyushmore2311@hotmail.com",
    pass: "Piyush@109",
  },
  maxConnections: 1,
});

const sendEmail = async (emailContent, sendTo) => {
  const mailOptions = {
    from: "piyushmore2311@hotmail.com",
    to: sendTo,
    html: emailContent?.body,
    subject: emailContent?.subject,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);

    console.log("Email sent", info);
  });
};

module.exports = {
  sendEmail,
  generateEmailBody,
  Notification,
  THRESHOLD_PERCENTAGE,
};
