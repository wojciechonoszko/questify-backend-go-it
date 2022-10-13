// const sendgrid = require("@sendgrid/mail");
// const Mailgen = require("mailgen");
// const { PRODUCTION_URL, EMAIL_TO_VERIFY } = require("../helpers/constants");

// require("dotenv").config();

// class EmailService {
//   #sender = sendgrid;
//   #GenerateTemplate = Mailgen;
//   constructor(env) {
//     switch (env) {
//       case "development":
//         this.link = "http://localhost:3000";
//         break;
//       case "production":
//         this.link = PRODUCTION_URL;
//         break;
//       default:
//         this.link = "http://localhost:3000";
//         break;
//     }
//   }

//   #createTemplateVerifyEmail(verifyToken, name) {
//     const mailGenerator = new this.#GenerateTemplate({
//       theme: "salted",
//       product: {
//         name: "Questify",
//         link: "https://questify.netlify.app",
//       },
//     });
//     const email = {
//       body: {
//         name,
//         intro:
//           'Welcome to Project "Questify"! We\'re very excited to have you on board.',
//         action: {
//           instructions: "To start questify your life, please click here:",
//           button: {
//             color: "#22BC66",
//             text: "Confirm your account",
//             // link: `${this.link}/users/verify/${verifyToken}`,
//             link: `https://questifyapp.netlify.app/auth/${verifyToken}`,
//           },
//         },
//       },
//     };
//     const emailBody = mailGenerator.generate(email);
//     return emailBody;
//   }

//   async sendVerifyEmail(verifyToken, email, name) {
//     this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
//     const msg = {
//       to: email,
//       from: EMAIL_TO_VERIFY,
//       subject: "Verify email",
//       html: this.#createTemplateVerifyEmail(verifyToken, name),
//     };

//     this.#sender.send(msg);
//   }
// }

// module.exports = EmailService;


// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: "test@example.com",
//   from: "test@example.com",
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });


const MailGen = require("mailgen");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailGenerator = new MailGen({
  theme: "salted",
  product: {
    name: "Awesome App",
    link: "http://localhost:8155",
    // logo: your app logo url
  },
});

const email = {
  body: {
    name: "Jon Doe",
    intro: "Welcome to email verification",
    action: {
      instructions: "Please click the button below to verify your account",
      button: {
        color: "#33b5e5",
        text: "Verify account",
        link: "http://example.com/verify_account",
      },
    },
  },
};

const emailTemplate = mailGenerator.generate(email);
require("fs").writeFileSync("preview.html", emailTemplate, "utf8");

// const msg = {
//   to: "wojciechonoszko@o2.pl",
//   from: "wojciechonoszko@gmail.com",
//   subject: "Test verification email",
//   html: emailTemplate,
//   text: "https://google.com - link do google",
// };

// const EmailService = async () => {
//   try {
//     sgMail.send(msg);
//     console.log(msg);
//     return
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// module.exports = { EmailService };



const EmailService = async () => {
  const msg = {
    to: "wojciechonoszko@o2.pl",
    from: "wojciechonoszko@gmail.com",
    subject: "Test verification email",
    html: emailTemplate,
    text: "https://google.com - link do google",
  };
  await sgMail.send(msg);
  return true;
};

module.exports = { EmailService };