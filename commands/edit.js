const { MessageEmbed } = require('discord.js');
const db = require('../stuff/postgres.js')

exports.run = async (client, ctx, args) => 
{
    if(ctx.member.roles.cache.find(r => r.name === "TAS Tamer")){
        var table = 'p'+ctx.guildId;
        var x = await db.get(table)

        var configTable = 'c'+ctx.guildId;
        var config = await db.get(configTable)

        var embed = new MessageEmbed()
        .setColor('#facb62')
        .setTitle("XP Editor")
        .setAuthor({ name: ctx.author.username, iconURL: ctx.author.avatarURL()})
        .setFooter({ text: client.config.prefix+'edit [player] [edit]'});

        if (args.length > 0)
        {
            var carg = args[0].replace(/[^0-9]/g, "") 
            var column = 'p'+carg
            const opt = Object.keys(x);
            if (opt.includes(column))
            {

                //var player = ctx.guild.members.fetch(m => m.id == carg)
                var xp = x[column]
                embed.setFooter({ text: 'Editting user ' + carg});
                if (args.length > 1)
                {
                    var edit = args[1].replace(/[^0-9-+]/g, "")
                    if (edit)
                    {
                        var total = 0
                        if (edit[0] == "+" || edit[0] == "-")
                            total = xp + parseInt(edit)
                        else
                            total = parseInt(edit)

                        await db.set(table, column, total)
                        embed.setDescription(xp + " (" + edit + ") -> " + total)

                        var logchan = ctx.guild.channels.cache.find(c => c.id == config.logchan)
                        if (logchan)
                        {
                            var log = new MessageEmbed()
                            .setColor('#facb62')
                            .setTitle("Edit Log")
                            .setAuthor({ name: ctx.author.username, iconURL: ctx.author.avatarURL()})
                            .setDescription(xp + " (" + edit + ") -> " + total)
                            .setFooter({ text: 'Editting user ' + carg});
                            logchan.send({ embeds: [log] });
                        }
                    }
                    else
                    {
                        embed.setDescription("Error: Enter a valid number.")
                    }
                }
                else
                {
                    embed.setDescription(xp + " xp")
                }
            }
            else
            {
                embed.setDescription(args[0] + " is not a valid user.")
            }
        }
        else
        {
            embed.setDescription("Usage: `" + client.config.prefix + "edit [player] [edit]`")
        }

        ctx.channel.send({ embeds: [embed] });
    }
    else
    {
        ctx.reply("You do not have permission to run this command. You must have the `TAS Tamer` role to operate the bot.")
    }
}