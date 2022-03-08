const { MessageEmbed } = require('discord.js');
exports.run = async (client, ctx, args) => 
{
    var embed = new MessageEmbed()
        .setColor('#facb62')
        .setTitle("Help List")
        .setAuthor({ name: ctx.author.username, iconURL: ctx.author.avatarURL()})
        .addFields(
            {
                name: "Commands",
                value: 
                "`xp` : See how much xp you have in the current server.\n" +
                "`lb/leaderboard` : View current server leaderboard.\n" +
                "`reset/sr` : Reset self to 0 (must be enabled in the server)."
            },
            {
                name: "Tamer Commands",
                value: 
                "You must have the `@TAS Tamer` role in order to run these commands.\n" +
                "`config` : Edit the server config, check out `tas!config help`.\n" +
                "`edit` : Edit another player's xp."
            },
            {
                name: "Usage",
                value: "`tas![command]`\nExample: `tas!xp`"
            }
        )
    ctx.channel.send({ embeds: [embed] });
}