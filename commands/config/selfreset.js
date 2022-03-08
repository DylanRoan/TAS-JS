const { MessageEmbed } = require('discord.js');
const db = require('../../stuff/postgres.js')

exports.run = async (client, ctx, embed, x, args) => 
{
    var configTable='c'+ctx.guildId;
    var enabled = (x.selfreset) ? "Enabled" : "Disabled";
    if (args.length > 1)
    {
        var enable = args[1].toLowerCase()
        if (enable == "true" || enable == "enable")
        {
            await db.set(configTable, 'selfreset', true)
            embed.addField("Self Reset Enabled", "Set to enabled.")
        }
        else if (enable == "false" || enable == "disable")
        {
            await db.set(configTable, 'selfreset', false)
            embed.addField("Self Reset Enabled", "Set to disabled.")
        }
        else
        {
            embed.addField("Invalid Input", "Use `enable/true` to enable and `disable/false` to disable.")
        }
    }
    else
    {
        
        embed.addField("Threads Enabled", enabled + " : " + x.selfreset)
    }


    embed
    .addFields(
        {name: "Description", value: "Check if players are permitted to set themselves to 0."}
        );

    
    return embed
}