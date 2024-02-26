module.exports = {
    name: 'lower [message OR reply]',
    description: 'Replies with a lowercase version of the message',
    async execute(message, args) {
        let quoted = message.hasQuotedMsg ? await message.getQuotedMessage() : false

        if (!quoted && args.length == 0) return;
        if (!quoted) {
            message.reply(`${args.join(" ").toLowerCase()}`)
            return;
        }

        let quoted_number = message._data.quotedParticipant
        console.log("QUOTED:",quoted, "FROM",quoted_number)

        if (!quoted_number) return;
        let quoted_message = quoted.body
        message.reply(`${quoted_message.toLowerCase()}`)
    },
};