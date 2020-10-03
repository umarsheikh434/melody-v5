//Modules
const Discord = require("discord.js");
const fs = require("fs");

//New client
const client = new Discord.Client();

//The bot connects using the configuration file
const settings = require ("./config/bot.json")

//Create a new Player
const { Player } = require("discord-player")

//To easily access the player
const player = new Player(client)
client.player = player;

// DB
const db = require("quick.db")
client.db = db

// Embed
client.sendEmbed = (channel, title, description, fields, footer, color, thumbnail, image) => {
        return new Promise((resolve, reject) => {
            channel.send({
                embed: {
                    title: title,
                    description: description,
                    fields: fields,
                    thumbnail: { url: thumbnail || "" },
                    image: { url: image || "" },
                    color: color || "RANDOM",
                    footer: { text: footer}
                }
            }).then(message => {
                resolve(message);
                return message;
            }).catch(err => {
                reject(err);
            });
        });
    }

    client.sendErrorEmbed = (channel, error) => {
        return new Promise((resolve, reject) => {
            channel.send({
                embed: {
                    title: ":x: ERROR",
                    description: `\`\`\`${error}\`\`\``,
                    color: "RANDOM",
                }
            }).then(message => {
                resolve(message);
            }).catch(err => {
                reject(err);
            });
        });
    }



    client.editEmbed = (channel, message, title, description, fields, footer, color, thumbnail) => {
        return new Promise(async (resolve, reject) => {
            let m = await channel.messages.fetch(message);
            m.edit({
                embed: {
                    title: title,
                    description: description,
                    fields: fields,
                    thumbnail: { url: thumbnail || "" },
                    color: color || "RANDOM",
                    footer: { text: footer}
                }
            }).then(message => {
                resolve(message);
            }).catch(err => {
                reject(err);
            });
        });
    }

    client.getEmbed = async (channel, message) => {
        let m = await channel.message.fetch(message);
        return m;
    }

//Events
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading event ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});

//New commands
client.commands = new Discord.Collection();

//Commands
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});

//Login
client.login(settings.token_bot);
