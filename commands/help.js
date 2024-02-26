const fs = require("then-fs");
const requireReload = require('require-reload');

const { prefixes } = require("../config.json");
const prefix = prefixes[0]

module.exports = {
    name: 'help [command?]',
    description: 'Displays the help message',
    async execute(message, args) {

        let str = "\`\`\`┌╼╼ Commands\n"

        let commandFiles = fs
            .readdirSync("./commands")
            .filter((file) => file.endsWith(".js"));

        for (let file of commandFiles) {
            let command = requireReload(`./${file}`);

            str = str.concat(`│ ${prefix}${command.name} - ${command.description}\n`)
        }

        message.reply(`${str}└╼╼\`\`\`
*_bot by puzzl3d & dootw_*`);
    },
};