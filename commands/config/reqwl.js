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
            await db.set(configTable, 'reqwl', arg)
            embed.addField("Required Letters per Word", "Set to `" + arg + "`")
        }
        else
        {
            embed.addField("Invalid Input", "Please enter a valid number.")
        }
    }
    else
    {
        
        embed.addField("Required Letters per Word", x.reqwl.toString())
    }
    embed
    .addFields(
        {name: "Description", value: "Required amount of letters in a word before a word is considered valid. Does __not__ accept decimal numbers."}
        );
    return embed
}