











































































































































































const axios = require("axios");
const config = require('../config');
const { cmd } = require("../command");



cmd({
  pattern: "screenshot",
  react: "🌐",
  alias: ["ss", "ssweb"],
  desc: "Capture a full-page screenshot of a website.",
  category: "utility",
  use: ".screenshot <url>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const url = args[0];
    if (!url) {
      return reply("❌ Please provide a valid URL. Example: `.screenshot https://mrfrankinc.vercel.app`");
    }

    // Validate the URL
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return reply("❌ Invalid URL. Please include 'http://' or 'https://'.");
    }

    // Generate the screenshot URL using Thum.io API
    const screenshotUrl = `https://image.thum.io/get/fullpage/${url}`;

    // Send the screenshot as an image message
    await conn.sendMessage(from, {
      image: { url: screenshotUrl },
      caption: `  *🌐 Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ 𝑉𝑜𝑟𝒕𝒆𝒙 𝑿𝒎𝒅 🌐*\n\n🔗 *Website URL:* \n${url}`,
      contextInfo: {
        mentionedJid: [msg.sender], // Fix: Use `msg.sender` instead of `m.sender`
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363304325601080@newsletter',
          newsletterName: "𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃",
          serverMessageId: 143,
        },
      },
    }, { quoted: mek });

  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    reply("❌ Failed to capture the screenshot. Please try again.");
  }
});
