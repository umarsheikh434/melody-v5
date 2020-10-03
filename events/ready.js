const config = require(`../config/bot.json`)

module.exports = async (client) => {

    //If the bot is ready it sends a message in the console
    console.log(`${client.user.tag} is ready to play music now`);

    //Game
    client.user.setActivity(`${config.default_prefix}help`)

}
