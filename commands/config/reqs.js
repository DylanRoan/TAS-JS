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
            await db.set(configTable, 'reqs', arg)
            embed.addField("Required Sentences per Post", "Set to `" + arg + "`")
        }
        else
        {
            embed.addField("Invalid Input", "Please enter a valid number.")
        }
    }
    else
    {
        
        embed.addField("Required Sentences per Post", x.reqs.toString())
    }
    embed
    .addFields(
        {name: "Description", value: "Required amount of valid sentences in a post before a post is considered valid. Does __not__ accept decimal numbers."}
        );
    return embed
}