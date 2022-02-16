const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

require('dotenv').config();
var token = process.env.token;

const config = require("./config.json");

client.on('ready',() => {
    console.log('Ready to suffer!');
})

client.login(token)