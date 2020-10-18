module.exports = function(controller) {

    controller.middleware.receive.use((bot, message, next) => {
        console.log('IN > ', message.text, message.type);
        bot.reply(message, { type: "typing" });
        setTimeout(async () => {
        next();
        }, 800);
        // next();
    });

    controller.middleware.send.use((bot, message, next) => {
        console.log('OUT > ', message.text, message.channelData && message.channelData.quick_replies ? message.channelData.quick_replies : null, message.channelData && message.channelData.attachments ? message.channelData.attachments : null);
        // bot.reply(message, { type: "typing" });
        // setTimeout(async () => {
        // next();
        // }, 800);
        next();
    });

    controller.middleware.ingest.use(async (bot, message, next) => {
        message.touchedbyMiddleware = true;
        // bot.reply(message, { type: "typing" });
        // setTimeout(async () => {
        // next();
        // }, 800);
        next();
    });

}