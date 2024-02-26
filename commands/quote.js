const cutOffString = (str) => {
    if (!str) return "";
    const index = str.indexOf('@');
    if (index !== -1) {
      return str.substring(0, index);
    }
    return str;
  };

module.exports = {
    name: 'quote [message OR reply]',
    description: 'Replies with a quoted version of the message',
    async execute(message, args) {
        //let chat = await message.getChat();
        let quoted = message.hasQuotedMsg ? await message.getQuotedMessage() : false

        if (!quoted && args.length == 0) return;
        if (!quoted) {
            message.reply(`"${args.join(" ")}" -@${cutOffString(message.from)}, ${(new Date().getFullYear())}`, message.chat, {mentions:[message.from]})
            return;
        }

        // DOUBLE QUOTE??

        let quoted_number = message._data.quotedParticipant
        console.log("QUOTED:",quoted, "FROM",quoted_number)

        if (!quoted_number) return;
        let quoted_message = quoted.body
        console.log(quoted, quoted.id)
        message.reply(`"${quoted_message}" -@${cutOffString(quoted_number)}, ${(new Date().getFullYear())}`, message.chat, {mentions:[quoted_number]})
    },
};