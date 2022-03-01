const { MessageEmbed } = require('discord.js');
const db = require('../../stuff/postgres.js')

exports.run = async (client, ctx, embed, x, args) => 
{
    var configTable='c'+ctx.guildId;
    if (args.length > 1)
    {
        var carg = args[1].replace(/[^0-9]/g, "") 
        var chan = ctx.guild.channels.cache.find(c => c.id == carg && c.type == "GUILD_TEXT")
        
        var arr = (x.blackchan) ? x.blackchan : [];

        if (chan || arr.includes(carg))
        {
            if (!arr.includes(carg))
            {
                arr.push(carg)
                embed.addField("Added to Blacklisted Channels", "<#" + carg + "> : `" + carg + "`")
            }
            else
            {
                arr = arr.filter(function (c) { return c != carg})
                embed.addField("Removed from Blacklisted Channels", "<#" + carg + "> : `" + carg + "`")
            }

            if (arr.length < 1) { arr = null }
            var query = (arr) ? 'ARRAY['+arr.toString()+']' : "null"
            await db.set(configTable, 'blackchan', query)
        }
        else
        {
            embed.addField("Invalid Channel", "Could not find channel with id : " + args[1])
        }
    }
    else
    {
        var chanlist = ""
        if (x.blackchan)
        {
            for (const c of x.blackchan)
            { 
                chanlist += "<#" + c + "> : " + c + "\n"
            }
        } else { chanlist = "None." }
        embed
        .addField("Blacklisted Channels", chanlist)
    }
                
    embed
    .addFields(
        {name: "Description", value: "*Accepts channel IDs or links*\nList of blacklisted roleplay channels."}
        );

    
    return embed
}