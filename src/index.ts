const Discord = require("discord.js");
require("dotenv").config();
const bot = new Discord.Client();
const chatchannel = process.env.CHANNELID;
const guild = process.env.GUILDID;
const TOKEN = process.env.TOKEN;
console.log(Number(String(process.env.PORT)));
const bedrock = require("bedrock-protocol");
let client = bedrock.createClient({
    host: process.env.IP,
    port: Number(String(process.env.PORT)),
    username: process.env.ACCOUNTUSERNAME,
    offline: false,
});
client.on("disconnect", (packet) => {
    client.reconnect;
});
client.on("join", (packet) => {
    console.log("On Server");
    console.log(client.profile);
});
client.on("command_output", (packet) => {
    if (packet.output[0]['message_id'] == 'commands.players.list.names') {
        var tv = bot.guilds.cache.get(guild);
        tv.channels.cache
            .get(chatchannel)
            .send(`${packet.output[0]['parameters'][0]}/${packet.output[0]['parameters'][1]} players online \n \`\`\` ${packet.output[1]['parameters']}\`\`\` `);
    }
});
client.on("text", (packet) => {
    console.log(Object.getOwnPropertyNames(client.profile));
    if (packet.type == "chat") {
        if (packet.source_name != client.options.username) {
            if (packet.source_name != undefined) {
                var tv = bot.guilds.cache.get(guild);
                tv.channels.cache
                    .get(chatchannel)
                    .send(`${packet.source_name}>> ${packet.message}`);
            }
            else {
                var tv = bot.guilds.cache.get(guild);
                tv.channels.cache.get(chatchannel).send(`${packet.message}`);
            }
        }
    }
    if (packet.type == "translation") {
        var tv = bot.guilds.cache.get(guild);
        console.log(packet);
        if (packet.message == "§e%multiplayer.player.joined") {
            tv.channels.cache
                .get(chatchannel)
                .send(`**${packet.parameters[0]}** has joined the game!`);
        }
        if (packet.message == "§e%multiplayer.player.left") {
            tv.channels.cache
                .get(chatchannel)
                .send(`**${packet.parameters[0]}** has left the game how sad.`);
        }
        if (String(packet.message).includes("death.attack.")) {
            tv.channels.cache
                .get(chatchannel)
                .send(`:skull: **${packet.parameters[0]}** came to there demise.`);
        }
    }
});
bot.on("message", function (message) {
    if (message.channel.id == chatchannel) {
        if (message.author != bot.user) {
            client.queue("command_request", {
                command: `/tellraw @a {"rawtext":[{"text":"§r[§9Discord§r] ${message.author.username} >> ${message.content}"}]}`,
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
bot.on("message", function (message) {
    if (message.content == "playerlist") {
        client.queue("command_request", {
            command: `/list`,
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
});
bot.login(TOKEN);
