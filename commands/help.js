const config = require ("../config/bot.json");
const emotes = require ("../config/emojis.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //New embed
    const help = new Discord.MessageEmbed()
    .setAuthor("HELP MENU", client.user.displayAvatarURL())
     .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`These are the command ${client.user.username} Bot`)
    .addField("**Music - (11)**", "`play`, `pause`, `resume`, `queue`, `clear-queue`, `shuffle`, `np`, `loop`, `volume`, `skip`, `stop`, `w-filters`")
    .addField("**Filters - (18)**", "`bassboost`, `8D`, `vaporwave`, `nightcore`, `phaser`, `tremolo`, `vibrato`, `reverse`, `treble`, `normalizer`, `surrounding`, `pulsator`, `subboost`, `karaoke`, `flanger`, `gate`, `haas`, `mcompand`")
    .addField("**Informations - (2)**", "`ping`, `help`, `prefix`")
    .setFooter(`To use filters, ${config.default_prefix}filter (the filter). Example: ${config.default_prefix}filter 8D.`)
    .setColor("ORANGE")

    //Message
    message.channel.send(help)

}