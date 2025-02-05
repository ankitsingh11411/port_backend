const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
  debug: true,
  logger: true,
});

const sendEmail = (to, subject, text) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent successfully:', info.response);
        resolve(info.response);
      }
    });
  });
};

module.exports = { sendEmail };
