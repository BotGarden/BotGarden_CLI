import Discord from 'discord.js';

module.exports = {
    name: 'helloworld',
    description: 'Hello World!',
    execute(message: Discord.Message) {
        message.channel.send('Hello World!');
    },
};