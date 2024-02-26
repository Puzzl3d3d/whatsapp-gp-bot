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
    name: 'nerdmock [message OR reply]',
    description: 'Replies with a mocked and nerded version of the message',
    async execute(message, args) {
        //let chat = await message.getChat();
        console.log(message, args)
        let quoted = await message.getQuotedMessage()

        if (!quoted && args.length == 0) return;

        let quoted_number = quoted.author;
        console.log("QUOTED:",quoted)

        if (!quoted) {
            console.log("NERDMOCKING SELF MESSAGE")
            message.reply(`"${mock(args.join(" "))}" -🤓☝`)
            return;
        }
        let quoted_message = quoted.body
        console.log("NERDMOCKING QUOTED MESSAGE")
        console.log(quoted)
        message.reply(`"${mock(quoted_message)}" -🤓☝`)
    },
};