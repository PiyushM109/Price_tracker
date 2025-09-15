const nodemailer = require("nodemailer");

const mailSender = async (emails, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: emails,
      subject: subject,
      html: text,
    });
    console.log({ info });
    return info;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mailSender;
