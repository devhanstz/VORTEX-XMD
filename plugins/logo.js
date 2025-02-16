const { cmd, commands } = require("../command");
const { fetchJson } = require("../lib/functions");

cmd({
  'pattern': "logo",
  'desc': "Create logos",
  'react': '🎗',
  'category': "other",
  'filename': __filename
}, async (
  bot,
  message,
  user,
  { from, quoted, body, command, args, q, reply }
) => {
  try {
    if (!args[0]) {
      return reply("*_Please give me a text._*");
    }

    let menuMessage = "*🤍 💫 Vᴏʀᴛᴇx xᴍᴅ 💫 LOGO MAKER 💫* " +
      "*🔢 Reply with a number to choose a style ➠* " +
      "1 ➠ Black Pink " +
      "2 ➠ Black Pink 2 " +
      "3 ➠ Vortex 3D " +
      "4 ➠ Naruto " +
      "5 ➠ Digital Glitch " +
      "6 ➠ Pixel Glitch " +
      "... " +
      "20 ➠ American Flag 3D " +
      "> *©💫 Vᴏʀᴛᴇx xᴍᴅ 💫*";

    let sentMessage = await bot.sendMessage(from, { text: menuMessage }, { quoted: message });

    bot.ev.on('messages.upsert', async event => {
      const receivedMessage = event.messages[0];
      if (!receivedMessage.message || !receivedMessage.message.extendedTextMessage) {
        return;
      }

      const selectedNumber = receivedMessage.message.extendedTextMessage.text.trim();
      if (receivedMessage.message.extendedTextMessage.contextInfo && 
          receivedMessage.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
        
        let logoUrls = {
          '1': "https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html",
          '2': "https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html",
          '3': "https://en.ephoto360.com/create-glossy-silver-3d-text-effect-online-802.html",
          '4': "https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html",
          '5': "https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html",
          '6': "https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html",
          // Add more cases up to '20'
        };

        if (logoUrls[selectedNumber]) {
          let apiResponse = await fetchJson(`https://api-pink-venom.vercel.app/api/logo?url=${logoUrls[selectedNumber]}&name=${q}`);
          await bot.sendMessage(from, {
            'image': { 'url': apiResponse.result.download_url },
            'caption': "> *©💫 Vᴏʀᴛᴇx xᴍᴅ 💫*"
          }, { quoted: message });
        } else {
          reply("*_Invalid choice. Please reply with a number from 1 to 20._*");
        }
      }
    });
  } catch (error) {
    console.error(error);
    reply("*_An error occurred while processing your request._*");
  }
});
