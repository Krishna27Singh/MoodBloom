const nodemailer = require("nodemailer");
const cron = require("node-cron");
const userModel = require("../models/userModel");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendDailyEmail = async () => {
  const users = userModel.getAllUsers();

  for (const user of users) {
    const mailOptions = {
      from: process.env.EMAIL,
      to: user,
      subject: "🌿 MoodBloom Daily Reminder",
      html: `
        <h2>Hey there! 👋</h2>
        <p>Don't forget to log your mood today in <b>MoodBloom</b>! 🌿</p>
        <p>Tracking your mood daily helps improve mental well-being! 😊</p>
        <a href="http://localhost:3000/">Log Your Mood Now</a>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Reminder sent to: ${user}`);
    } catch (error) {
      console.error(`❌ Error sending email to ${user}:`, error);
    }
  }
};

// ✅ Schedule email to send every 24 hours at 9 AM
const startDailyEmailReminder = () => {
  cron.schedule("0 9 * * *", () => {
    console.log("⏰ Sending daily mood reminder emails...");
    sendDailyEmail();
  }, {
    timezone: "Asia/Kolkata" // Adjust to your timezone
  });
};

module.exports = { startDailyEmailReminder };
