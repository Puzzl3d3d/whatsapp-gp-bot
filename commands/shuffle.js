function shuffleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }
  
function shuffleWords(input) {
    // If input is a string, split it by spaces; if it's an array, use it as is
    const arrayOfStrings = typeof input === 'string' ? input.split(' ') : input;
  
    // Apply shuffle to each string in the array and return the full string with spaces
    return arrayOfStrings.map(shuffleString).join(' ');
}

module.exports = {
    name: 'shuffle [message OR reply]',
    description: 'Replies with a shuffled version of the message',
    async execute(message, args) {
        let quoted = message.hasQuotedMsg ? await message.getQuotedMessage() : false

        if (message.body.toLowerCase().includes('ginger')) message.reply(`dont even try`);

        if (!quoted && args.length == 0) return;
        if (!quoted) {
            if (args.includes('Ginger')) {
                message.reply(`dont even try`);
                return;
            }
            message.reply(`${shuffleWords(args)}`)
            return;
        }

        let quoted_number = message._data.quotedParticipant
        console.log("QUOTED:",quoted, "FROM",quoted_number)

        if (!quoted_number) return;
        let quoted_message = quoted.body
        console.log(quoted, quoted.id)
        if (quoted_message.toLowerCase().includes('ginger')) {
            message.reply(`dont even try`);
            return;
        }
        message.reply(`${shuffleWords(quoted_message)}`)
    },
};