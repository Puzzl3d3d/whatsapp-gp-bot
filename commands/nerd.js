module.exports = {
    name: 'nerd [message OR reply]',
    description: 'Replies with the message and the nerd emoji at the end',
    async execute(message, args) {
        console.log(message, args)
        let quoted = await message.getQuotedMessage()

        if (!quoted && args.length == 0) return;

        let quoted_number = quoted.author;
        console.log("QUOTED:",quoted)

        if (!quoted) {
            console.log("NERDING SELF MESSAGE")
            message.reply(`"${args.join(" ")}" -🤓☝`)
            return;
        }
        let quoted_message = quoted.body
        console.log("NERDING QUOTED MESSAGE")
        console.log(quoted)
        message.reply(`"${quoted_message}" -🤓☝`)
    },
};