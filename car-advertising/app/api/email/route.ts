import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
  const { email, name, message } = await request.json();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    /* 
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  if (!process.env.MY_EMAIL || !process.env.MY_PASSWORD) {
    return NextResponse.json({ error: 'Missing email credentials' });
  }
  

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.error('Error sending mail:', err); // Log full error
          reject(err.message);
        } else {
          console.log('Email sent:', info.response); // Log success info
          resolve('Email sent');
        }
      });
    });

    try {
      await sendMailPromise();
      return NextResponse.json({ message: 'Email sent' });
    } catch (err) {
      console.error('Mail send error:', err); // Log full error in catch
      return NextResponse.json({ error: err });
    }
}