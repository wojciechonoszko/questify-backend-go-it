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

  function createTemplateVerifyEmail(verifyTokenEmail, name) {
    const mailGenerator = new MailGen({
      theme: "salted",
      product: {
        name: "Questify",
        // link: "https://questify.netlify.app",
        link: "http://localhost:3000",
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
            // link: `https://www.google.pl`,
            link: `http://localhost:3000/auth/${verifyTokenEmail}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    // const emailTemplate = mailGenerator.generate(email);
    // return emailTemplate;

    const emailTemplate = mailGenerator.generate(email);
    require("fs").writeFileSync("preview.html", emailTemplate, "utf8");
    return emailTemplate
  }

// const mailGenerator = new MailGen({
//   theme: "salted",
//   product: {
//     name: "Awesome App",
//     link: "http://localhost:3000",
//     // logo: your app logo url
//   },
// });

// const email = {
//   body: {
//     name: "John Doe",
//     intro: "Welcome to email verification",
//     action: {
//       instructions: "Please click the button below to verify your account",
//       button: {
//         color: "#33b5e5",
//         text: "Verify account",
//         link: "http://example.com/verify_account",
//       },
//     },
//   },
// };

// const emailTemplate = mailGenerator.generate(email);
// require("fs").writeFileSync("preview.html", emailTemplate, "utf8");



function getMessage(verifyTokenEmail, name, email) {
  // const body = "This is a test email using SendGrid from Node.js";
  return {
    // to: "wojciechonoszko@o2.pl",
    to: email,
    from: "wojciechonoszko@gmail.com",
    subject: "Test email with Node.js and SendGrid",
    html: createTemplateVerifyEmail(verifyTokenEmail, name),
    // html: `<strong>${body}</strong>`,
  };
}

//

// const getMessage = async (req, res, next) => {
//   // const body = "This is a test email using SendGrid from Node.js";
//   const { verifyToken, name } = req.body;
//   return {
//     to: "wojciechonoszko@o2.pl",
//     from: "wojciechonoszko@gmail.com",
//     subject: "Test email with Node.js and SendGrid",
//     html: createTemplateVerifyEmail(`8AUW4ILVh9GJTLiYeJ-K1`, `jupiter`),
//     html: createTemplateVerifyEmail(verifyToken, name),
//     // html: `<strong>${body}</strong>`,
//   };
// }
//



async function sendEmail(verifyTokenEmail, name, email) {
  // verifyTokenEmail = `njdIr20BVBJvCuGumFFYC`;
  // name = `Gitara`;
  // email = `wojciechonoszko@o2.pl`;
  try {
    await sgMail.send(getMessage(verifyTokenEmail, name, email));

    console.log("Test email sent successfully");
    return {
      message: `Order confirmation email sent successfully for orderNr`,
    };
  } catch (error) {
    console.error("Error sending test email");
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}

// (async () => {
//   console.log("Sending test email");
//   await sendEmail();
// })();

module.exports = {sendEmail}