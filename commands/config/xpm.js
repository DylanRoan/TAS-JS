const { MessageEmbed } = require('discord.js');
const db = require('../../stuff/postgres.js')

exports.run = async (client, ctx, embed, x, args) => 
{
    var configTable='c'+ctx.guildId;
    if (args.length > 1)
    {
        var arg = args[1].replace(/[^0-9]/g, "") 
        if (arg)
        {
            await db.set(configTable, 'xpm', arg)
            embed.addField("XP Multiplier", "Set to `" + arg + "`")
        }
        else
        {
            embed.addField("Invalid Input", "Please enter a valid number.")
        }
    }
    else
    {
        
        embed.addField("XP Multiplier", "x"+x.xpm)
    }
    embed
    .addFields(
        {name: "Description", value: "XP Multiplier. Does __not__ accept decimal numbers."}
        );
    return embed
}