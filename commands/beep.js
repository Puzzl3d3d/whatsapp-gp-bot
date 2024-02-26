module.exports = {
    name: 'beep',
    description: 'Replies with \"boop!\"',
    async execute(message, args) {
        message.reply('boop!');
    },
};