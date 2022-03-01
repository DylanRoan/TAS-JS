const { MessageEmbed } = require('discord.js');
const db = require('../../stuff/postgres.js')

exports.run = async (client, ctx, embed, x, args) => 
{
    var configTable='c'+ctx.guildId;
    if (args.length > 1)
    {
        var carg = args[1].replace(/[^0-9]/g, "") 
        var chan = ctx.guild.channels.cache.find(c => c.id == carg && c.type == "GUILD_TEXT")

        var arr = (x.valchan) ? x.valchan : [];

        if (chan || arr.includes(carg))
        {
            if (!arr.includes(carg))
            {
                arr.push(carg)
                embed.addField("Added to Valid Channels", "<#" + carg + "> : `" + carg + "`")
            }
            else
            {
                arr = arr.filter(function (c) { return c != carg})
                embed.addField("Removed from Valid Channels", "<#" + carg + "> : `" + carg + "`")
            }

            if (arr.length < 1) { arr = null }
            var query = (arr) ? 'ARRAY['+arr.toString()+']' : "null"
            await db.set(configTable, 'valchan', query)
        }
        else
        {
            embed.addField("Invalid Channel", "Could not find channel with id : " + args[1])
        }
    }
    else
    {
        var chanlist = ""
        if (x.valchan)
        {
            for (const c of x.valchan)
            { 
                chanlist += "<#" + c + "> : " + c + "\n"
            }
        } else { chanlist = "None." }
        embed
        .addField("Valid Channels", chanlist)
    }


    embed
    .addFields(
        {name: "Description", value: "*Accepts channel IDs or links*\nList of valid roleplay channels. If inside blacklisted category or channel, it is considered invalid."}
        );

    
    return embed
}