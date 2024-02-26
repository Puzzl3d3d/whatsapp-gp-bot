module.exports = {
    name: 'timer [seconds]',
    description: 'Sets a timer to go off in n seconds',
    async execute(message, args) {
        setTimeout(()=>{
          message.reply('Timer up!');
        }, args[0] * 1000)
    },
};