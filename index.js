const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require("./config.json");

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : process.env.PG_HOST,
    port : process.env.PG_PORT,
    user : process.env.PG_USER,
    password : process.env.PG_PASSWORD,
    database : process.env.PG_DATABASE
  }
});

client.on('ready',() => {
  console.log('Ready to suffer!');
})

client.on('messageCreate', message => {
  if (message.author.bot) return;
  playerChecker();
})
client.login(process.env.TOKEN)

function playerChecker(ctx)
{
  //server check
  ctx.reply(ctx.guildId)
}