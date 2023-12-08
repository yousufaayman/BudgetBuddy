const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: "465",
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "seif.elbosaty3@gmail.com",
    pass: "",
  },
  secure: true,
});

exports.sendMail = async (mailData) => {
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};
