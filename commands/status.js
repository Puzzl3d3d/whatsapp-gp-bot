module.exports = {
    name: 'status',
    description: 'Makes a black status',
    async execute(message, args, client) {
        const chatId = 'status@broadcast';
        const text = 'hello';

        // Check if status@broadcast is already a chat, if not it should be created
        let chat = await client.getChatById(chatId).catch(() => null);
        if (!chat) {
            // Handle the case where the chat might not exist or can't be retrieved
            console.log("Cannot find or create the status chat.");
            return;
        }

        // Send the status update as an image with caption
        await chat.sendMessage(text);
    },
};