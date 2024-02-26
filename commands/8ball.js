const responses = [
    "It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it",
    "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes",
    "Reply hazy, try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again",
    "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"
]
const length = responses.length
function getRandom() {
    return responses[Math.round(Math.random() * (length-1))]
}

module.exports = {
    name: '8ball',
    description: 'Replies with a response from the Magic 8 Ball',
    async execute(message, args) {
        message.reply(getRandom());
    },
};