module.exports = function(controller) {

    controller.middleware.receive.use((bot, message, next) => {
        bot.reply(message, { type: "typing" });
        setTimeout(async () => {
        next();
        }, 800);
        // next();
    });

    // async function middlewareTest(bot, message, next) {
    //     if (message.text.length > 0) {
    //         let time = 1800;
    //         await setTimeout(async() => {
    //             await next();
    //         }, time);
    //     }
    // }
    // controller.middleware.send.use(middlewareTest);

    // controller.middleware.send.use(async (bot, message, next) => {
    //     await bot.reply(message, { type: "typing" });
        // setTimeout(async () => {
    //         await bot.changeContext(message.reference);
            // await next();
        // }, 500);
    //     // next();
    // });
    controller.middleware.send.use((bot, message, next) => {
        // bot.reply(message, { type: "typing" });
        setTimeout(async () => {
            await next();
        }, 400);
        // next();
        
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