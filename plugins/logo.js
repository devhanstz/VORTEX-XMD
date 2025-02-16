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
      return reply("*_Please provide a text input._*");
    }

    let menuMessage = `*🤍 💫 Vᴏʀᴛᴇx xᴍᴅ 💫 LOGO MAKER 💫*\n\n` +
      `*🔢 Reply with a number to choose a style ➠*\n\n` +
      `1 ➠ Black Pink\n` +
      `2 ➠ Black Pink 2\n` +
      `3 ➠ Vortex 3D\n` +
      `4 ➠ Naruto\n` +
      `5 ➠ Digital Glitch\n` +
      `6 ➠ Pixel Glitch\n` +
      `7 ➠ Cyberpunk\n` +
      `8 ➠ Neon Light\n` +
      `9 ➠ Smoke Text\n` +
      `10 ➠ Fire Text\n` +
      `11 ➠ Gradient 3D\n` +
      `12 ➠ Cartoon Style\n` +
      `13 ➠ Graffiti\n` +
      `14 ➠ Ice Text\n` +
      `15 ➠ Sci-Fi Text\n` +
      `16 ➠ Watercolor\n` +
      `17 ➠ Luxury Gold\n` +
      `18 ➠ Metallic\n` +
      `19 ➠ Abstract Art\n` +
      `20 ➠ American Flag 3D\n\n` +
      `> *©💫 Vᴏʀᴛᴇx xᴍᴅ 💫*`;

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
          '7': "https://en.ephoto360.com/create-cyberpunk-text-effect-online-835.html",
          '8': "https://en.ephoto360.com/neon-light-text-effect-generator-770.html",
          '9': "https://en.ephoto360.com/create-smoke-text-effect-online-810.html",
          '10': "https://en.ephoto360.com/create-fire-text-effect-online-815.html",
          '11': "https://en.ephoto360.com/create-gradient-3d-text-effect-online-807.html",
          '12': "https://en.ephoto360.com/create-cartoon-style-text-effect-online-768.html",
          '13': "https://en.ephoto360.com/create-graffiti-text-effect-online-775.html",
          '14': "https://en.ephoto360.com/create-ice-text-effect-online-774.html",
          '15': "https://en.ephoto360.com/create-sci-fi-text-effect-online-776.html",
          '16': "https://en.ephoto360.com/create-watercolor-text-effect-online-779.html",
          '17': "https://en.ephoto360.com/create-luxury-gold-text-effect-online-780.html",
          '18': "https://en.ephoto360.com/create-metallic-text-effect-online-781.html",
          '19': "https://en.ephoto360.com/create-abstract-art-text-effect-online-782.html",
          '20': "https://en.ephoto360.com/create-american-flag-3d-text-effect-online-783.html"
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
