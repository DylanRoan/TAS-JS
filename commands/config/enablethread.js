const { MessageEmbed } = require('discord.js');
const db = require('../../stuff/postgres.js')

exports.run = async (client, ctx, embed, x, args) => 
{
    var configTable='c'+ctx.guildId;
    var enabled = (x.enablethread) ? "Enabled" : "Disabled";
    if (args.length > 1)
    {
        var enable = args[1].toLowerCase()
        if (enable == "true" || enable == "enable")
        {
            await db.set(configTable, 'enablethread', true)
            embed.addField("Threads Enabled", "Set to enabled.")
        }
        else if (enable == "false" || enable == "disable")
        {
            await db.set(configTable, 'enablethread', false)
            embed.addField("Threads Enabled", "Set to disabled.")
        }
        else
        {
            embed.addField("Invalid Input", "Use `enable/true` to enable and `disable/false` to disable.")
        }
    }
    else
    {
        
        embed.addField("Threads Enabled", enabled + " : " + x.enablethread)
    }


    embed
    .addFields(
        {name: "Description", value: "Checks if threads are valid for xp."}
        );

    
    return embed
}