const { MessageEmbed } = require('discord.js');
const db = require('../stuff/postgres.js')

exports.run = async (client, ctx, args) => 
{  
    if (ctx.guild.ownerId == ctx.author.id) 
    {
        var table = 'p'+ctx.guildId;

        var embed = new MessageEmbed()
        .setColor('#facb62')
        .setTitle("Purge " + ctx.guild.name)
        .setAuthor({ name: ctx.author.username, iconURL: ctx.author.avatarURL()})
        .setDescription("Current unavailable. Join the server in my description and ask `Unsung Melody` to purge it for you.")
        
        ctx.channel.send({ embeds: [embed] });
        return
        if (false)
        {
        const filter = m => m.author.id == ctx.author.id
        ctx.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] }).then(c => {
            var collected = c.first()
            if (collected.content == ctx.guild.name)
            {
                ctx.channel.send("Deleting xp table...")
                db.deleteTable(table)
                ctx.channel.send("Table cleared.")
            }
            else
            {
                ctx.channel.send("Aborted: Invalid input.")
            }
        }).catch(e => ctx.channel.send("Aborted: Timed out."));
        }
    }
    else
    {
       ctx.channel.send("You must be the owner of this server to purge your server's xp table.");
    }
        
        

}