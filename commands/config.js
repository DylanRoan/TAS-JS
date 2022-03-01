const { MessageEmbed } = require('discord.js');
const db = require('../stuff/postgres.js')

exports.run = async (client, ctx, args) => 
{
    if(ctx.member.roles.cache.find(r => r.name === "TAS Tamer")){
    var configTable = 'c'+ctx.guildId;
    var x = await db.get(configTable)
    const options = Object.keys(x);
    
    var embed = new MessageEmbed()
        .setColor('#facb62')
        .setTitle(ctx.guild.name + "'s Config Options")
        .setAuthor({ name: ctx.author.username, iconURL: ctx.author.avatarURL()})
        .setFooter({ text: client.config.prefix+'config [option] [change]'});

    options.shift()
    options.push("help")
    
    if (args.length > 0)
    {
        if (options.includes(args[0]))
        {
            var con = require(`./config/${args[0]}.js`);
            embed = await con.run(client, ctx, embed, x, args);
        }
        else
        {
            var a = ""
            for (x in options)
            {
                a+="`" + options[x] + "` "
            }
            embed
            .setDescription('Invalid Argument.')
            .addField('Help', "Run `" + client.config.prefix + "config help` to get a list of all the valid subcommands and their brief descriptions.")
        }
    }
    else
    {
        var p1 = "";

        p1 += (x.valchan) ? "Valid Channels [`" + options[0] + "`]: `list`\n" : "Valid Channels [`" + options[0] + "`]: `None`\n"
        p1 += (x.blackchan) ? "Blacklisted Channels [`" + options[1] + "`]: `list`\n" : "Blacklisted Channels [`" + options[1] + "`]: `None`\n"
        p1 += (x.valcat) ? "Valid Categories [`" + options[2] + "`]: `list`\n" : "Valid Categories [`" + options[2] + "`]: `None`\n"
        p1 += (x.blackcat) ? "Blacklisted Categories [`" + options[3] + "`]: `list`\n" : "Blacklisted Categories [`" + options[3] + "`]: `None`\n"
        p1 += (x.logchan) ? "Log Channel [`" + options[4] + "`]: <#" + x.logchan + ">\n" : "Log Channel [`" + options[4] + "`]: `None`\n"
        p1 += "Threads Enabled [`" + options[5] + "`]: `" + x.enablethread + "`"
    
        p2 = "XP Multiplier [`" + options[6] + "`]: `" + x.xpm + "`\n"

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
        p2 += "Per Word/Sentence/Post [`" + options[7] + "`]: `XP per " + pwsp + "`\n"

        p2 += "Valid Sentences per Post [`" + options[8] + "`]: `" + x.reqs + "`\n"
        p2 += "Valid Words per Sentence [`" + options[9] + "`]: `" + x.reqwps + "`\n"
        p2 += "Valid Letters per Word [`" + options[10] + "`]: `" + x.reqwl + "`"

        embed.addFields({name: 'Channels Config', value: p1, inline: true}, {name: 'XP Config', value: p2, inline: true}, {name: "Help", value: "Run `" + client.config.prefix + "config help` to get a list of all the valid subcommands and their brief descriptions."});
    }

    ctx.channel.send({ embeds: [embed] });

    //console.log(ctx.guild.channels.cache.find(c => c.id == 1))
    }
    else
    {
        ctx.reply("You do not have permission to run this command. You must have the `TAS Tamer` role to operate the bot.")
    }
    

}
