module.exports = {
    name: 'ping',
    description: 'Replies with \"pong!\"',
    async execute(message, args) {
        message.reply('pong!');
    },
};