module.exports = {
    name: 'info',
    description: 'Replies with group info',
    async execute(message, args, client) {
        let chat = await message.getChat();
        if (chat.isGroup) {
            const owner = chat.owner.user
            const owner_number = chat.owner._serialized
            
            const desc_owner = chat.groupMetadata.descOwner.user
            const desc_onwer_number = chat.groupMetadata.descOwner._serialized
            
            console.log(message)
            console.log(chat)
            message.reply(`_*Group Details*_

Name: ${chat.name}
Description: ${chat.description}
Description Last Modified By: @${desc_owner}

Created At: ${chat.createdAt.toString()}
Created By: @${owner}

Participant Count: ${chat.participants.length}
Past Participant Count: ${chat.groupMetadata.pastParticipants.length}`, message.chat, {mentions:[desc_onwer_number, owner_number]});
        } else {
            message.reply('This command can only be used in a group!');
        }

    },
};