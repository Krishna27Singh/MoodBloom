require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors()); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASSWORD, 
  },
});

app.post('/api/send-email', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Welcome to Moodbloom!",
    html: `<p><h1>Hi</h1>,</p><p><h2>Thanks for logging in! Have a great day! 😊</h2></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = 6767;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
