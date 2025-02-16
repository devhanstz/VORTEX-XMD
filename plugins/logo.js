const { cmd, commands } = require("../command");
const { fetchJson } = require("../lib/functions");

// Function to create the logo based on style
const createLogo = async (bot, from, message, styleUrl, name) => {
  try {
    let apiResponse = await fetchJson(`https://api-pink-venom.vercel.app/api/logo?url=${styleUrl}&name=${name}`);
    await bot.sendMessage(from, {
      'image': { 'url': apiResponse.result.download_url },
      'caption': "> *©💫 Vᴏʀᴛᴇx xᴍᴅ 💫*"
    }, { quoted: message });
  } catch (error) {
    console.error(error);
    await bot.sendMessage(from, "*_An error occurred while processing your request._*", { quoted: message });
  }
};

// Logo list and style URLs
const logos = {
  '1': { name: "Blackpink", url: "https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html" },
  '2': { name: "Blackpink 2", url: "https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html" },
  '3': { name: "Vortex 3D", url: "https://en.ephoto360.com/create-glossy-silver-3d-text-effect-online-802.html" },
  '4': { name: "Naruto", url: "https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html" },
  '5': { name: "Digital Glitch", url: "https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html" },
  '6': { name: "Pixel Glitch", url: "https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html" },
  '7': { name: "Cyberpunk", url: "https://en.ephoto360.com/create-cyberpunk-text-effect-online-835.html" },
  '8': { name: "Neon Light", url: "https://en.ephoto360.com/neon-light-text-effect-generator-770.html" },
  '9': { name: "Smoke Text", url: "https://en.ephoto360.com/create-smoke-text-effect-online-810.html" },
  '10': { name: "Fire Text", url: "https://en.ephoto360.com/create-fire-text-effect-online-815.html" },
  '11': { name: "Gradient 3D", url: "https://en.ephoto360.com/create-gradient-3d-text-effect-online-807.html" },
  '12': { name: "Cartoon Style", url: "https://en.ephoto360.com/create-cartoon-style-text-effect-online-768.html" },
  '13': { name: "Graffiti", url: "https://en.ephoto360.com/create-graffiti-text-effect-online-775.html" },
  '14': { name: "Ice Text", url: "https://en.ephoto360.com/create-ice-text-effect-online-774.html" },
  '15': { name: "Sci-Fi Text", url: "https://en.ephoto360.com/create-sci-fi-text-effect-online-776.html" },
  '16': { name: "Watercolor", url: "https://en.ephoto360.com/create-watercolor-text-effect-online-779.html" },
  '17': { name: "Luxury Gold", url: "https://en.ephoto360.com/create-luxury-gold-text-effect-online-780.html" },
  '18': { name: "Metallic", url: "https://en.ephoto360.com/create-metallic-text-effect-online-781.html" },
  '19': { name: "Abstract Art", url: "https://en.ephoto360.com/create-abstract-art-text-effect-online-782.html" },
  '20': { name: "American Flag 3D", url: "https://en.ephoto360.com/create-american-flag-3d-text-effect-online-783.html" }
};

// .logo Command to show all available logos
cmd({
  'pattern': "logo",
  'desc': "Show available logos",
  'react': '🎗',
  'category': "logo",
  'filename': __filename
}, async (bot, message, user, { from, quoted, body, command, args, q, reply }) => {
  let logoMenu = `*Logo Styles Available:*\n\n`;
  Object.keys(logos).forEach(key => {
    logoMenu += `*Logo ${key}:* ${logos[key].name}\n`;
  });
  logoMenu += `\nReply with the number or name of the logo to generate it.\n> *Example: .logo Naruto*`;

  await bot.sendMessage(from, { text: logoMenu }, { quoted: message });
});

// Handle user responses for numeric or named logo requests
cmd({
  'pattern': "(\\d+|\\w+)",
  'desc': "Handle numeric or name-based logo selection",
  'react': '🎗',
  'category': "logo",
  'filename': __filename
}, async (bot, message, user, { from, quoted, body, command, args, q, reply }) => {
  const userInput = body.trim();
  
  // Check if the user input is a number or a name
  if (logos[userInput]) {
    // If the user types the name directly (e.g., .logo Naruto)
    const selectedLogo = logos[userInput];
    if (!args[0]) return reply(`*Please provide a name for the logo.*`);
    await createLogo(bot, from, message, selectedLogo.url, args.join(" "));
  } else if (logos[parseInt(userInput)]) {
    // If the user selects by number (e.g., .logo 1)
    const selectedLogo = logos[parseInt(userInput)];
    if (!args[0]) return reply(`*Please provide a name for the logo.*`);
    await createLogo(bot, from, message, selectedLogo.url, args.join(" "));
  } else {
    return reply("*_Invalid logo selection. Please reply with a valid logo number or name._*");
  }
});
