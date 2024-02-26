const responses = [
    "Yes",
    "No",
]
const length = responses.length
function getRandom() {
    return responses[Math.round(Math.random() * (length-1))]
}

module.exports = {
    name: 'yesorno',
    description: 'Replies with either yes or no',
    async execute(message, args) {
        message.reply(getRandom());
    },
};