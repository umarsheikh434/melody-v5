const config = require(`../config/bot.json`)

module.exports = (client, message) => {

    //Ignore all bots
    if (message.author.bot) return;

    //Prefix
    let prefix = client.db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = config.default_prefix;

    //Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(prefix) !== 0) return;
  
    //Our standard argument/command name definition.
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    //Grab the command data from the client.commands (Discord collection)
    const cmd = client.commands.get(command);
  
    //If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
  
    //Run the command
    cmd.run(client, message, args);

};
