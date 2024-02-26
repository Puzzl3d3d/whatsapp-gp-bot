const Jimp = require('jimp');
const sharp = require('sharp');
const { MessageMedia } = require('whatsapp-web.js');

async function deepfryImage(media, mimeType) {
    // If the media is a sticker (webp), convert it to PNG first
    let imageBuffer = Buffer.from(media.data, 'base64');
    if (mimeType === 'image/webp') {
        imageBuffer = await sharp(imageBuffer).toFormat('png').toBuffer();
    }

    const image = await Jimp.read(imageBuffer);
    image
        .contrast(0.8)
        .quality(1)
        .color([
            { apply: 'saturate', params: [100] },
        ]);

    const processedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    return processedBuffer;
}

module.exports = {
    name: 'deepfry [image (attachment) OR sticker OR reply]',
    description: 'Replies with a deepfried version of the image or sticker',
    async execute(message, args) {

        let deepfry_message = message.hasMedia ? message : await message.getQuotedMessage();

        console.log(deepfry_message, message.hasMedia, deepfry_message.hasMedia);

        if (deepfry_message && (deepfry_message.hasMedia && (deepfry_message.type === "image" || deepfry_message.type === "sticker"))) {
            // ⏳ while processing
            await message.react('⏳');

            try {
                const media = await deepfry_message.downloadMedia();
                const processedImageBuffer = await deepfryImage(media, media.mimetype);
                const deepfriedMedia = new MessageMedia('image/jpeg', processedImageBuffer.toString('base64'));
                await message.reply(deepfriedMedia);
                // ✅ if succeeded
                await message.react('✅');

            } catch (error) {
                await message.reply('Failed to process attached media.');
                // ❌ if failed
                await message.react('❌');
                console.error(`Failed to process media: ${error}`);
            }
        } else {
            await message.reply('No media in image or sticker found.');
        }
    },
};