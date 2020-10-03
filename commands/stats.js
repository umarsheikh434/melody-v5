const Discord = require("discord.js")
const moment = require('moment');
require('moment-duration-format');

exports.run = async (client, message, args) => {

    var duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
    

    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Bot Stats')
    .addField(`Client`, client.user.tag, true)
        .addField(`Uptime`, duration, true)
        .addField(`Users`, client.users.cache.size, true)
        .addField(`Servers`, client.guilds.cache.size, true)
        .addField(`Channels`, client.channels.cache.size, true)
        .addField(`Discord.js`, `v${Discord.version}`, true)
        .addField(`Node`, process.version, true)
    .addField(`Memory Usage`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
        
  
    embed.setTimestamp();

    await message.channel.send(embed);
    return;

}
