require('dotenv').config();
const { Pool } = require('pg');
const pg = new Pool({
  connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

async function queryDB (query, params) {
    let queryResult = await pg.query(query, params);
    return queryResult;
  }

module.exports.serverInit = async (ctx) => 
{
    var guildId = ctx.guildId;
    var xpTable = 'p'+guildId;
    var configTable = 'c'+guildId;

    //Create XP Table
    await queryDB('CREATE TABLE IF NOT EXISTS ' + xpTable + ' (id INT);', [])
    var x = await queryDB('SELECT DISTINCT id FROM ' + xpTable + ';', []);

    //Set id to 0
    if (x.rows.length == 0) { await queryDB('INSERT INTO ' + xpTable + ' (id) VALUES (0);', []) }

    /* 
    Create Config Table

    id : WHERE SQL stuff : 0

    valchan INT[] : Array of channels to check : Null = ignore
    blackchan INT[] : Array of channels to not check : Null = ignore
    valcat INT[] : Array of categories to not check : Null = ignore
    blackcat INT[] : Array of categories to not check : Null = ignore
    logchan INT : Log Channel : Null = ignore
    enablethread BOOL : If posts from threads are valid : False

    xpm INT : XP Multiplier : x1
    pwsp INT : XP per Word(1), Sentence(2), or Post(3) : Post(3)
    reqs INT : Required amount of valid sentences before post is valid : 0
    reqwps INT : Required amount of words per sentence before sentence is valid : 0
    reqwl INT : Required amounr of letters per word before word is valid : 0
    */
    await queryDB('CREATE TABLE IF NOT EXISTS ' + configTable + ' (id INT, valchan VARCHAR(20)[], blackchan VARCHAR(20)[], valcat VARCHAR(20)[], blackcat VARCHAR(20)[], logchan VARCHAR(20), enablethread BOOL, xpm INT, pwsp INT, reqs INT, reqwps INT, reqwl INT);', [])
    var x = await queryDB('SELECT DISTINCT id FROM ' + configTable + ';', []);
    
    //Set id to 0
    if (x.rows.length == 0) { await queryDB('INSERT INTO ' + configTable + ' (id, valchan, blackchan, valcat, blackcat, logchan, enablethread, xpm, pwsp, reqs, reqwps, reqwl) VALUES (0, null, null, null, null, null, false, 1, 3, 0, 0, 0);', []) }
    x = await queryDB('SELECT * FROM ' + configTable + ';', []);
}

module.exports.playerInit = async (ctx) =>
{
    var guildId = ctx.guildId;
    var xpTable = 'p'+guildId;
  
    var player = ctx.author.id;
    await queryDB('ALTER TABLE ' + xpTable + ' ADD COLUMN IF NOT EXISTS p' + player + ' BIGINT;', []);
  
    var tab = await queryDB('SELECT DISTINCT p' + player + ' FROM ' + xpTable + ';', []);
    if (tab.rows[0]['p'+player] == null) { await queryDB('UPDATE ' + xpTable + ' SET p' + player + ' = 0 WHERE id = 0;', []) }
    tab = await queryDB('SELECT DISTINCT p' + player + ' FROM ' + xpTable + ';', []);
}

module.exports.get = async (table, column = "*") =>
{
    var x = await queryDB(`SELECT ` + column + ` FROM ` + table + `;`, [])
    return x.rows[0]
}

module.exports.set = async (table, column, change) => {
    await queryDB(`UPDATE ` + table + ` SET ` + column + ` = ` + change + ` WHERE id = 0;`, [])
}