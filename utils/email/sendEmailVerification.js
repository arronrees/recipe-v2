import nodemailer from 'nodemailer';

export default async function sendEmailVerification() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // const email = await transporter.sendMail({
    //   from: process.env.SMTP_FROM,
    //   to: '',
    //   subject: 'Testing',
    //   text: 'Testing testing 123',
    //   html: `
    //   <h1>Testing testing...</h1>
    //   <p>123...</p>
    //   `,
    // });
    // console.log(email);

    await transporter.verify();
  } catch (err) {
    console.log('-------------- Error -------------');
    console.log(err);
  }
}
