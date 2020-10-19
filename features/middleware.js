module.exports = function(controller) {

    controller.middleware.receive.use((bot, message, next) => {
        console.log('IN > ', message.text, message.type);
        bot.reply(message, { type: "typing" });
        setTimeout(async () => {
        next();
        }, 800);
        // next();
    });

    // async function middlewareTest(bot, message, next) {
    //         console.log('OUT > ', message.text, message.channelData && message.channelData.quick_replies ? message.channelData.quick_replies : null, message.channelData && message.channelData.attachments ? message.channelData.attachments : null);
    //     if (message.text.length > 0) {
    //         let time = 1800;
    //         await setTimeout(async() => {
    //             await next();
    //         }, time);
    //     }
    // }
    // controller.middleware.send.use(middlewareTest);

    // controller.middleware.send.use(async (bot, message, next) => {
    //     console.log('OUT > ', message.text, message.channelData && message.channelData.quick_replies ? message.channelData.quick_replies : null, message.channelData && message.channelData.attachments ? message.channelData.attachments : null);
    //     // console.log(message)
    //     await bot.reply(message, { type: "typing" });
    //     setTimeout(async () => {
    //         await bot.changeContext(message.reference);
    //         await next();
    //     }, 2000);
    //     // next();
    // });
    controller.middleware.send.use((bot, message, next) => {
        console.log('OUT > ', message.text, message.channelData && message.channelData.quick_replies ? message.channelData.quick_replies : null, message.channelData && message.channelData.attachments ? message.channelData.attachments : null);
        // console.log(message)
        // bot.reply(message, { type: "typing" });
        // setTimeout(async () => {
        //     await next();
        // }, 300);
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