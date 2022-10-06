const sendgrid = require("@sendgrid/mail");
const Mailgen = require("mailgen");
const { PRODUCTION_URL, EMAIL_TO_VERIFY } = require("../helpers/constants");

require("dotenv").config();

class EmailService {
  #sender = sendgrid;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;
      case "production":
        this.link = PRODUCTION_URL;
        break;
      default:
        this.link = "http://localhost:3000";
        break;
    }
  }

  #createTemplateVerifyEmail(verifyToken, name) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: "salted",
      product: {
        name: "Questify",
        link: "https://questify.netlify.app",
      },
    });
    const email = {
      body: {
        name,
        intro:
          'Welcome to Project "Questify"! We\'re very excited to have you on board.',
        action: {
          instructions: "To start questify your life, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            // link: `${this.link}/users/verify/${verifyToken}`,
            link: `https://questifyapp.netlify.app/auth/${verifyToken}`,
          },
        },
      },
    };
    const emailBody = mailGenerator.generate(email);
    return emailBody;
  }

  async sendVerifyEmail(verifyToken, email, name) {
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: EMAIL_TO_VERIFY,
      subject: "Verify email",
      html: this.#createTemplateVerifyEmail(verifyToken, name),
    };

    this.#sender.send(msg);
  }
}

module.exports = EmailService;


const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "test@example.com",
  from: "test@example.com",
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });