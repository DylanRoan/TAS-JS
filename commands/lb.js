const { MessageEmbed } = require('discord.js');
const db = require('../stuff/postgres.js')
const lb = require('./leaderboard.js')

exports.run = async (client, ctx, args) => 
{
    lb.run(client, ctx, args);
}