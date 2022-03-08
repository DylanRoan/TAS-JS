const { MessageEmbed } = require('discord.js');
const db = require('../stuff/postgres.js')

exports.run = async (client, ctx, args) => 
{
    var configTable = "c" + ctx.guildId
    var x = await db.get(configTable)
    if (x.selfreset)
    {
        var table = "p"+ctx.guildId
        var player = "p"+ctx.author.id
        var old = await db.get(table, player)
        await db.set(table, player, 0)
        ctx.channel.send("<@" + ctx.author.id + "> has been set to 0.")

        var logchan = ctx.guild.channels.cache.find(c => c.id == x.logchan)
        if (logchan)
        {
            var log = new MessageEmbed()
            .setColor('#facb62')
            .setTitle("Self Reset")
            .setAuthor({ name: ctx.author.username, iconURL: ctx.author.avatarURL()})
            .setDescription("<@" + ctx.author.id + "> has been set from " + old + " to 0.")
            logchan.send({ embeds: [log] });
        }
    }
    else
    {
        ctx.channel.send("This feature is disabled in this server. Enable it by using `tas!config`.")
    }
}