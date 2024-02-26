const qrcode = require('qrcode-terminal');
const requireReload = require('require-reload');

const compSciMfs = "120363032242389212@g.us"
const ladsUnracist = "120363046478971733@g.us"

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message_create', message => {
	console.log(message)
	let { prefixes } = requireReload("./config.json");

	let hasPrefix = false
	let message_prefix = ""
	for (const prefix of prefixes) {
		if (message.body.startsWith(prefix)) {hasPrefix = true; message_prefix = prefix; break;}
	}
	if (!hasPrefix) return;

    const args = message.body.slice(message_prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	console.log("COMMAND RECOGNISED:",command,"WITH ARGS",args)

	let data = requireReload(`./commands/${command}.js`)

	if (!data) {
		console.log("command doesnt exist lmao")
		console.log(commandFiles)
		return;
	}

	try {
		console.log("Running command")
		data.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply("There was an error!");
	}
});

var chat;

function sendTyping() {
	chat.sendStateTyping()
	setTimeout(sendTyping, 20000)
}

client.on('ready', async () => {
    console.log('Client is ready!');
	chat = await client.getChatById(ladsUnracist)
	sendTyping()
});

client.initialize();
