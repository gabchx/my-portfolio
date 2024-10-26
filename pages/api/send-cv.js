// pages/api/send-cv.js

import nodemailer from 'nodemailer';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Validate email
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }

    try {
      // Fetch the CV as a buffer
      const cvBuffer = await downloadCV();

      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Prepare the email options
      const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL,
        to: email,
        subject: 'Here is my CV',
        text: 'Thank you for your interest! Please find my CV attached.\n',
        attachments: [
          {
            filename: 'CV.pdf', // Change the extension based on your CV file type
            content: cvBuffer,
          },
        ],
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // After successfully sending the email, send an SMS notification
      await sendSmsNotification(email);

      return res.status(200).json({ message: 'CV sent successfully.' });
    } catch (error) {
      console.error('Error sending CV or SMS:', error);
      return res.status(500).json({ message: 'Failed to send CV or SMS.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Helper function to validate email
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Helper function to download CV from Google Drive
async function downloadCV() {
  const { contact } = await import('../../utils/data');
  const cvUrl = contact.cv.url;

  // Google Drive direct download link format
  // Ensure the link is in the format: https://drive.google.com/uc?export=download&id=FILE_ID
  const response = await axios.get(cvUrl, {
    responseType: 'arraybuffer',
  });

  return response.data;
}

// Helper function to send SMS notification
async function sendSmsNotification(email) {
  const freeUser = process.env.FREE_USER;
  const freePass = process.env.FREE_PASS;

  if (!freeUser || !freePass) {
    console.warn('FREE_USER or FREE_PASS environment variables are not set.');
    return;
  }

  const encodedUser = encodeURIComponent(freeUser);
  const encodedPass = encodeURIComponent(freePass);
  const encodedMsg = encodeURIComponent(
    `[Portfolio Message] Someone asked for your CV\nEmail: ${email}`
  );

  const url = `https://smsapi.free-mobile.fr/sendmsg?user=${encodedUser}&pass=${encodedPass}&msg=${encodedMsg}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log('SMS sent successfully.');
    } else {
      console.error('Failed to send SMS:', response.data);
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
    // Depending on your requirements, you might want to throw the error
    // throw error;
  }
}
