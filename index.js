const { Client, Intents, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

require('dotenv').config();
const fs = require("fs");

client.commands = new Discord.Collection();

var config = {}
config['prefix'] = process.env.prefix
client.config = config;
console.log("Prefix is " + config.prefix)

const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}

const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(commandName, command);
}

client.on("ready", () =>{
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("Ready to suffer!")
  client.user.setActivity("stories | tas!help", {
    type: "LISTENING"
  });
});

client.login(process.env.TOKEN)
