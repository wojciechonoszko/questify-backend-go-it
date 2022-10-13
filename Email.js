const sgMail = require("@sendgrid/mail");

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "wojciechonoszko@o2.pl",
  from: "wojciechonoszko@gmail.com",
  subject: "Test verification email",
  html: "<b><a href='https://google.com'>Link do google</a></b>",
  text: "https://google.com - link do google",
};

// waszemail+alias@dostawca.domena

// adamstrzyzewski9001@gmail.com
// adam.strzyzewski.9001@gmail.com
// a.d.a.m.s.t.r.z.y.z.e.w.s.k.i.9001@gmail.com

sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.log(error);
  });
