const { MessageEmbed } = require('discord.js');
const db = require('../stuff/postgres.js')

exports.run = async (client, ctx, args) => 
{
    var table = 'p'+ctx.guildId;
    var column = 'p'+ctx.author.id
    var x = await db.get(table)
    var xp = x[column]
    var embed = new MessageEmbed()
        .setColor('#facb62')
        .setTitle(ctx.author.username + "'s XP")
        .setDescription(xp+" xp")
        .setAuthor({ name: ctx.author.username, iconURL: ctx.author.avatarURL()})
        .setFooter({ text: client.config.prefix+'xp'});
    ctx.channel.send({ embeds: [embed] });
}