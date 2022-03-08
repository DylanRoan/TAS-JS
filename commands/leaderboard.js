const { MessageEmbed, MessageButton, Interaction } = require('discord.js');
const db = require('../stuff/postgres.js')
const paginationEmbed = require('discordjs-button-pagination');

exports.run = async (client, ctx, args) => 
{
    var table = 'p'+ctx.guildId;
    var x = await db.get(table)
    delete x.id

    var z = sort_object(x)

    var embed = new MessageEmbed()
    .setColor('#facb62')
    .setTitle(ctx.guild.name + "'s Players")
    .setAuthor({ name: ctx.author.username, iconURL: ctx.author.avatarURL()})

    var embedPages = []

    var id = false;
    if (args.length > 0)
    {
        id = (args[0] == "id") ? true : false
    }


    for (var i = 0; i < z.length; i += 10) {
        var temp = z.slice(i, i + 10);
        var desc = ""
        for (var o = 0; o < temp.length; o++)
        {
            desc += i+o+1 + ". "
            var player = temp[o][0].substring(1)
            if (id)
            {
                desc += "`" + player + "` : "
            }
            else
            {
                desc += "<@" + player + "> : "
            }
            desc += temp[o][1] + "\n"
        }
        embed.setDescription(desc)
        embedPages.push(embed)
    }

    const b1 = new MessageButton()
      .setCustomId("previousbtn")
      .setLabel("Previous")
      .setStyle("DANGER");

    const b2 = new MessageButton()
      .setCustomId("nextbtn")
      .setLabel("Next")
      .setStyle("SUCCESS");

    var buttons = [b1, b2]

    paginationEmbed(ctx, embedPages, buttons, 10000);
}


function sort_object(dict) {
    var items = Object.keys(dict).map(
        (key) => { return [key, dict[key]] });
    items.sort(  
        (a, b) => { return b[1] - a[1] });
    return(items)
} 