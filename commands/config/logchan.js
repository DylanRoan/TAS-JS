const { MessageEmbed } = require('discord.js');
const db = require('../../stuff/postgres.js')

exports.run = async (client, ctx, embed, x, args) => 
{
    var configTable='c'+ctx.guildId;
    if (args.length > 1)
    {
        var carg = args[1].replace(/[^0-9]/g, "") 
        var chan = ctx.guild.channels.cache.find(c => c.id == carg && c.type == "GUILD_TEXT")
        var logchan = (x.logchan) ? x.logchan : 0;
        var set = null;
        if (chan || logchan == carg)
        {
            if (logchan != carg)
            {
                set = carg;
                embed.addField("Log Channel Added", "<#" + carg + "> : `" + carg + "`")
            }
            else
            {
                set = null;
                embed.addField("Log Channel Removed", "<#" + carg + "> : `" + carg + "`")
            }

            var query = (set) ? set : "null"
            await db.set(configTable, 'logchan', query)
        }
        else
        {
            embed.addField("Invalid Channel", "Could not find channel with id : " + args[1])
        }
    }
    else
    {
        var chan = (x.logchan) ? "<#"+x.logchan+"> : " + x.logchan : "None."
        embed
        .addField("Valid Channels", chan)
    }


    embed
    .addFields(
        {name: "Description", value: "*Accepts channel IDs or links*\nLog channel that logs xp gained or lost from roleplay or edits."}
        );

    
    return embed
}