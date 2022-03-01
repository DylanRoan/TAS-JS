const { MessageEmbed } = require('discord.js');
const db = require('../../stuff/postgres.js')

exports.run = async (client, ctx, embed, x, args) => 
{
    var configTable='c'+ctx.guildId;
    if (args.length > 1)
    {
        var carg = args[1].replace(/[^0-9]/g, "") 
        var cat = ctx.guild.channels.cache.find(c => c.id == carg && c.type == "GUILD_CATEGORY")
        
        var arr = (x.valcat) ? x.valcat : [];

        if (cat || arr.includes(carg))
        {
            if (!arr.includes(carg))
            {
                arr.push(carg)
                embed.addField("Added to Valid Categories", cat.name + " : `" + carg + "`")
            }
            else
            {
                arr = arr.filter(function (c) { return c != carg})
                embed.addField("Removed from Valid Categories", cat.name + " : `" + carg + "`")
            }

            if (arr.length < 1) { arr = null }
            var query = (arr) ? 'ARRAY['+arr.toString()+']' : "null"
            await db.set(configTable, 'valcat', query)
        }
        else
        {
            embed.addField("Invalid Category", "Could not find category with id : " + args[1])
        }
    }
    else
    {
        var catlist = ""
        if (x.valcat)
        {
            for (const c of x.valcat)
            { 
                catlist += "<#" + c + "> : " + c + "\n"
            }
        } else { catlist = "None." }
        embed
        .addField("Valid Categories", catlist)
    }
                
    embed
    .addFields(
        {name: "Description", value: "*Accepts category IDs*\nList of valid roleplay categories. If inside blacklisted category, it is considered invalid."}
        );

    
    return embed
}