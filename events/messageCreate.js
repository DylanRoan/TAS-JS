const db = require('../stuff/postgres.js')
const rpcheck = require('../stuff/rpcheck.js')
module.exports = async (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
    if (message.channel.type == "DM") return;
    //Startup Stuff
    await db.serverInit(message);
    await db.playerInit(message);
    
    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.startsWith(client.config.prefix)) 
    {
    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
  
    // Run the command
    cmd.run(client, message, args);
    }
    else
    {
      xp = rpcheck(message);
    }
  };