


function hi() {
  console.log("Hello World!");
}
hi();
const {
  cmd,
  commands
} = require("../command");
const {
  fetchJson
} = require("../lib/functions");
cmd({
  'pattern': "flux",
  'alias': ['sd', "imagine"],
  'react': '🪄',
  'desc': "Generate an image using AI.",
  'category': 'main',
  'filename': __filename
}, async (_0x45375f, _0x116ed6, _0x50f8ed, {
  from: _0x362e57,
  quoted: _0x19982b,
  body: _0xf5ee0c,
  isCmd: _0x5663cf,
  command: _0x8a2223,
  args: _0x13257b,
  q: _0xf673b0,
  isGroup: _0x41b9b4,
  sender: _0xc5dcb0,
  senderNumber: _0x58604b,
  botNumber2: _0x4299ef,
  botNumber: _0x5c3f14,
  pushname: _0x1669dd,
  isMe: _0x42fb5b,
  isOwner: _0x1b81de,
  groupMetadata: _0x730bba,
  groupName: _0x1e41f3,
  participants: _0x914703,
  groupAdmins: _0x3461c8,
  isBotAdmins: _0x2b6506,
  isAdmins: _0x383355,
  reply: _0x16ec35
}) => {
  try {
    if (!_0xf673b0) {
      return _0x16ec35("Please provide a prompt for the image.");
    }
    await _0x16ec35("> *Vortex Brewing Your image...✨*");
    let _0x2b0917 = await fetchJson("https://api.giftedtech.web.id/api/ai/fluximg?apikey=gifted&prompt=" + _0xf673b0);
    const _0x2351b1 = _0x2b0917.result;
    await _0x45375f.sendMessage(_0x50f8ed.chat, {
      'image': {
        'url': _0x2351b1,
        'caption': "Generated by Vortex"
      }
    });
  } catch (_0x38a8f1) {
    console.error(_0x38a8f1);
    _0x16ec35("An error occurred: " + _0x38a8f1.message);
  }
});