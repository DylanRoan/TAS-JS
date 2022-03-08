const db = require('../stuff/postgres.js')
const { MessageEmbed } = require('discord.js');
module.exports = async (ctx) => 
{
    var table = 'c'+ctx.guildId
    var x = await db.get(table)

    var playerTable = 'p'+ctx.guildId
    var p = await db.get(playerTable)
    p = p["p"+ctx.author.id]
    //var valchan = (x.valchan) ? x.valchan : [];
    var valchan = []
    if (x.valchan) { valchan = x.valchan }
    var blackchan = []
    if (x.blackchan) { blackchan = x.blackchan }

    var valcat = []
    if (x.valcat) { valcat = x.valcat }
    var blackcat = []
    if (x.blackcat) { blackcat = x.blackcat }

    var channel = ctx.channel;
    var category = (channel.isThread()) ? channel.parent.parent : channel.parent
    

    var rpchannel = false;
    var post = ctx.content

    if (!(blackcat.includes(category.id) || blackchan.includes(channel.id)))
    {
        if (channel.isThread() && !x.enablethread)
        {
            return
        }
        else if (channel.isThread())
        {
            channel = channel.parent
        }

        if (valcat.includes(category.id) || valchan.includes(channel.id))
        {
            rpchannel = true;
        }
    }
    
    var validPost = false
    var totalSentences = 0
    var totalWords = 0

    if (rpchannel)
    {

        post = post.toLowerCase();
        post = post.replace(/[^a-zA-Z.0-9 ]/g, "") 

        

        var sentences = post.split('.')
        for (const s of sentences)
        {
            var validWords = 0;
            var words = s.split(" ")
            for(const w of words)
            {
                if (w.length >= x.reqwl)
                {
                    validWords++
                    totalWords++
                }
            }
            if (validWords >= x.reqwps)
            {
                totalSentences++
            }
        }
        if (totalSentences >= x.reqs)
        {
            validPost = true;
        }
    }

    var xp = 0
    if (validPost)
    {
        switch(x.pwsp)
        {
            case 1:
                xp = totalWords
                break;
            case 2:
                xp = totalSentences
                break;
            case 3:
                xp = 1
                break;
        }
        xp = xp * x.xpm
        
        var total = parseInt(p) + xp
        if (total >= 9000000000000000000)
        {
            total = 9000000000000000000
        }
        var logchan = ctx.guild.channels.cache.find(c => c.id == x.logchan)
        if (logchan)
        {
            var embed = new MessageEmbed()
            .setColor('#facb62')
            .setTitle("Roleplay Log")
            .setAuthor({ name: ctx.author.username, iconURL: ctx.author.avatarURL()})
            .setDescription("<#" + channel.id + "> in <#" + category.id + ">")
            .addField("XP", p + " -> " + total);
            logchan.send({ embeds: [embed] });
        }

        db.set(playerTable, "p"+ctx.author.id, total)
    }
}