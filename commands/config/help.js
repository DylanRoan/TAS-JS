const { MessageEmbed } = require('discord.js');
const db = require('../../stuff/postgres.js')

exports.run = async (client, ctx, embed, x, args) => 
{
    embed
    .addFields(
        {
            name: 'Channel/Category Config', 
            value:         
            '`valchan` : list of valid channels for xp gain.\n' +
            '`blackchan` : list of channels without xp gain.\n' +
            '`valcat` : list of valid categories for xp gain.\n' +
            '`blackcat` : list of categories without xp gain.\n' +
            '`logchan` : (one channel) sends logs of xp gain and editting in this channel.\n\n' +
            'Usage: `' + client.config.prefix + 'config [option] [channel id / link to channel]`\n' +
            'Example: `' + client.config.prefix + 'config blackchan #ooc-1`\n\n' +
            'This adds the channel or category to the list. Adding a channel or category that already exists inside the list removes it instead. For `logchan`, adding a new channel instead sets it to the new channel.' 
            
        },
        {
            name: 'Threads',
            value:
            '`enablethread` : determines whether posts inside threads are able to gain experience.\n\n' +
            'Usage: `' + client.config.prefix + 'config enablethread [true/enable/false/disable]`\n' +
            'Example: `' + client.config.prefix + 'config enablethread true`'
        },
        {
            name: 'XP Config',
            value:
            '`xpm` : XP Multiplier (Base XP * Multiplier)\n' +
            '`reqs` : Counts how many valid sentences are in a post to determine a post\'s validity.\n' +
            '`reqwps` : Counts how many valid words are in a sentence to determine a sentence\'s validity.\n' +
            '`reqwl` : Counts how many letters are in a word to determine a word\'s validity.\n\n' +
            'Usage: `' + client.config.prefix + 'config [option] [#]`\n' +
            'Example: `' + client.config.prefix + 'config reqs 3`'
        },
        {
            name: 'Word/Sentence/Post',
            value:
            '`pwsp` : Determines if xp is gained per valid word, sentence, or post.\n\n' +
            'Usage: `' + client.config.prefix + 'config pwsp [1/word/2/sentence/3/post]`\n' +
            'Example: `' + client.config.prefix + 'config pwsp post`'
        },
        {
            name: 'Misc',
            value:
            '`selfreset` : Determines if player is permitted to reset self to 0.\n\n' +
            'Usage: `' + client.config.prefix + 'config selfreset [true/enable/false/disable]`\n' +
            'Example: `' + client.config.prefix + 'config selfreset false`'
        }
    )
    return embed
}

