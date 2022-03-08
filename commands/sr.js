const reset = require('./reset.js')

exports.run = async (client, ctx, args) => 
{
    reset.run(client, ctx, args)
}