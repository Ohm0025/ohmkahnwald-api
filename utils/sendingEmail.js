require("dotenv").config();

const nodemailer = require("nodemailer");

const smtp_host = process.env.SMTP_HOST;
const smtp_port = process.env.SMTP_PORT;
const smtp_user = process.env.SMTP_USER;
// const smtp_pass = process.env.SMTP_PASSWORD;
const smtp_pass = `2Zq|]&>o@~`;

const transporter = nodemailer.createTransport({
  host: smtp_host,
  secure: true,
  secureConnection: false,
  tls: {
    ciphers: "SSLv3",
  },
  requireTLS: true,
  port: smtp_port,
  debug: true,
  connectionTimeout: 10000,
  auth: {
    user: smtp_user,
    pass: smtp_pass,
  },
});

async function sendVerificationEmail(userEmail, verifyCode) {
  const mailOptions = {
    from: smtp_user,
    to: userEmail,
    subject: "Verify Your Email Address",
    html: `
        <h1>Welcome to ohmkahnwald</h1>
         <p>Please use code below to verify your email address</p>
           <p>this code will be expired in 2 hours</p>
           <h3>${verifyCode}</h3> 
      <p>If you didn't request this, please ignore this email.</p>
      `,
  };
  const emailResult = await transporter.sendMail(mailOptions);
  return emailResult;
}

module.exports = sendVerificationEmail;
