const Discord = require("discord.js");
require("dotenv").config();
const bot = new Discord.Client();
const chatchannel = process.env.CHANNELID;
const guild = process.env.GUILDID;
const TOKEN = process.env.TOKEN;


console.log(Number(String(process.env.PORT)));
const bedrock = require("bedrock-protocol");
const client = bedrock.createClient({
  host: process.env.IP,
  port: Number(String(process.env.PORT)),
  username: process.env.ACCOUNTUSERNAME,
  offline: false,
});

client.on("join", (packet) => {
  console.log("On Server");
});

client.on("text", (packet) => {
  if (packet.source_name != client.options.username) {
    if (packet.source_name != undefined) {
      var tv = bot.guilds.cache.get(guild);
      tv.channels.cache
        .get(chatchannel)
        .send(`${packet.source_name}>> ${packet.message}`);
    }
  }
});


bot.on("message", function (message) {
  if (message.channel.id == chatchannel) {
    if (message.author != bot.user) {
      client.queue("command_request", {
        command: `/tellraw @a {"rawtext":[{"text":"${message.author.username}>> ${message.content}"}]}`,
        origin: {
          size: 0,
          type: 0,
          uuid: "",
          request_id: "",
          player_entity_id: "",
        },
        interval: false,
      });
    }
  }
});

bot.login(TOKEN);
