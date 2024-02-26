function misspellWord(word) {
    if (word.length <= 3) {
      // For words of length 3 or less, no internal shuffling is possible
      return word;
    }
  
    // Convert string to array to manipulate individual characters
    const arr = word.split('');
  
    // Flag to check if at least one swap has occurred
    let hasSwapped = false;
  
    for (let i = 1; i < arr.length - 2; i++) {
      // Swap a character with the next or the one after that if it hasn't been swapped yet
      if (!hasSwapped || Math.random() > 0.5) {
        const j = Math.random() > 0.5 ? i + 1 : i + 2;
        if (j < arr.length - 1) { // Ensure we don't go beyond the second to last character
          [arr[i], arr[j]] = [arr[j], arr[i]]; // Perform the swap
          hasSwapped = true; // Mark that we've made at least one swap
        }
      }
    }
  
    // Ensure at least one swap if none has occurred in the loop
    if (!hasSwapped) {
      const i = 1; // Second character
      const j = Math.random() > 0.5 ? i + 1 : i + 2; // Swap with next or one after
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Perform the swap
    }
  
    return arr.join('');
  }
  
  function horriblyMisspell(input) {
    // If input is a string, split it by spaces; if it's an array, use it as is
    const arrayOfWords = typeof input === 'string' ? input.split(' ') : input;
  
    // Apply misspelling to each word in the array and return the full string with spaces
    return arrayOfWords.map(misspellWord).join(' ');
  }

module.exports = {
    name: 'misspell [message OR reply]',
    description: 'Replies with a horribly misspelled version of the message',
    async execute(message, args) {
        let quoted = message.hasQuotedMsg ? await message.getQuotedMessage() : false

        if (!quoted && args.length == 0) return;
        if (!quoted) {
            message.reply(`${horriblyMisspell(args)}`)
            return;
        }

        let quoted_number = message._data.quotedParticipant
        console.log("QUOTED:",quoted, "FROM",quoted_number)

        if (!quoted_number) return;
        let quoted_message = quoted.body
        console.log(quoted, quoted.id)
        message.reply(`${horriblyMisspell(quoted_message)}`)
    },
};