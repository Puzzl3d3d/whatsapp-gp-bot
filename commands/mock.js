function mock(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0) { // check if the index is even
        result += str[i].toLowerCase(); // convert the letter to lowercase
        } else {
        result += str[i].toUpperCase(); // convert the letter to uppercase
        }
    }
    return result;
}
const cutOffString = (str) => {
    if (!str) return "";
    const index = str.indexOf('@');
    if (index !== -1) {
      return str.substring(0, index);
    }
    return str;
  };

module.exports = {
    name: 'mock [message OR reply]',
    description: 'Replies with a mocked version of the message',
    async execute(message, args) {
        //let chat = await message.getChat();
        let quoted = message.hasQuotedMsg ? await message.getQuotedMessage() : false

        if (!quoted && args.length == 0) return;
        if (!quoted) {
            message.reply(`"${mock(args.join(" "))}" -@${cutOffString(message.from)}`, message.chat, {mentions:[message.from]})
            return;
        }

        let quoted_number = message._data.quotedParticipant//quoted.author | quoted.from | quoted._data.author._serialized | quoted._data.from;
        console.log("QUOTED:",quoted, "FROM",quoted_number)

        if (!quoted_number) return;
        let quoted_message = quoted.body
        console.log(quoted, quoted.id)
        message.reply(`"${mock(quoted_message)}" -@${cutOffString(quoted_number)}`, message.chat, {mentions:[quoted_number]})
    },
};