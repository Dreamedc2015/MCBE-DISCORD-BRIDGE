const Discord = require("discord.js");
require('dotenv').config();
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;

const bedrock = require("bedrock-protocol");
const client = bedrock.createClient({
  host: "tailvile.xyz",
  username: "Dreamedc2015",
  offline: false, 
});

client.on("text", (packet) => {
  if (packet.source_name != client.options.username) {
      tv = bot.guilds.cache.get("830180687759802392");
    tv.channels.cache
      .get("830180688451993708")
      .send(`${packet.source_name}>> ${packet.message}`);
  }
});
//Try implumenting it in reverse aka you can talk to people in game
/* 
Hours Wasted:3
Attempts:24
*/

bot.login(TOKEN);
