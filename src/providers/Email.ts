import nodemailer from 'nodemailer';
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;
const MAIL_USERNAME = '';
const from: string = '"App Name" <' + MAIL_USERNAME + '>';

const refreshToken = '';
const clientId = '';
const clientSecret = '';

async function sendEmail(to: string, subject: string, html: string): Promise<any> {
  try {
    const OAuth2_client = new OAuth2(clientId, clientSecret);
    OAuth2_client.setCredentials({ refresh_token: refreshToken });
    const accessToken = await OAuth2_client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: MAIL_USERNAME,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken.token ?? '',
      },
    });
    return await transporter
      .sendMail({
        from,
        to,
        subject,
        html,
      })
      .catch((error) => {
        console.log('erorr = > ', error);
      });
  } catch (error) {
    console.log('erorr = > ', error);
  }
}

export default sendEmail;
