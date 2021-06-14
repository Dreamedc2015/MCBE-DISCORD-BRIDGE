const Discord = require("discord.js");
require('dotenv').config();
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;

const bedrock = require("bedrock-protocol");
const client = bedrock.createClient({
  host: "tailvile.xyz", // optional
  port: 19132, // optional, default 19132
  username: "Dreamedc2015", // the username you want to join as, optional if online mode
  offline: false, // optional, default false. if true, do not login with Xbox Live. You will not be asked to sign-in if set to true.
  // Optional for some servers which verify the title ID:
  // authTitle: bedrock.title.MinecraftNintendoSwitch
});

client.on("text", (packet) => {
  // Listen for chat messages and echo them back.
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
