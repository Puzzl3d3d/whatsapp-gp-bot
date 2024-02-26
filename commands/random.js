function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max-min))
}

module.exports = {
    name: 'random [min] [max]',
    description: 'Replies with a response from the Magic 8 Ball',
    async execute(message, args) {
        if (args.length < 2) {
            message.reply("Not enough arguments")
            return
        }
        try {
            let i1 = parseInt(args[0])
            let i2 = parseInt(args[1])
            message.reply(getRandom(i1, i2).toString());
        } catch (error) {
            console.log("ERROR",error)
            message.reply(error)
        }
        
    },
};