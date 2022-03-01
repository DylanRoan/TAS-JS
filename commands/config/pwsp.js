const { MessageEmbed } = require('discord.js');
const db = require('../../stuff/postgres.js')

exports.run = async (client, ctx, embed, x, args) => 
{
    var configTable='c'+ctx.guildId;
    var pwsp = ""
    if (x.pwsp == 1)
    {
        pwsp = "Word"
    }
    else if (x.pwsp == 2)
    {
        pwsp = "Sentence"
    }
    else
    {
        pwsp = "Post"
    }
    
    if (args.length > 1)
    {
        var arg = args[1].toLowerCase()
        if (arg == "word" || arg == 1)
        {
            await db.set(configTable, 'pwsp', 1)
            embed.addField("XP Counter", "Set to `XP per Word`")
        }
        else if (arg == "sentence" || arg == 2)
        {
            await db.set(configTable, 'pwsp', 2)
            embed.addField("XP Counter", "Set to `XP per Sentence`")
        }
        else if (arg == "post" || arg == 3)
        {
            await db.set(configTable, 'pwsp', 3)
            embed.addField("XP Counter", "Set to `XP per Post`")
        }
        else
        {
            embed.addField("Invalid Input", "`word/1`, `sentence/2`, or `post/3`")
        }
    }
    else
    {
        
        embed.addField("XP Counter", "XP per "+pwsp)
    }
    embed
    .addFields(
        {name: "Description", value: "Counts xp based on word, sentence, or post."}
        );
    return embed
}