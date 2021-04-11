import Discord from 'discord.js';

module.exports = {
    name: 'newcommand',
    description: 'This is a new command',
    execute(message: Discord.Message) {
        message.channel.send('This is a new command');
    },
};