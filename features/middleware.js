module.exports = function(controller) {

    controller.middleware.receive.use((bot, message, next) => {
        bot.reply(message, { type: "typing" });
        setTimeout(async () => {
        next();
        }, 800);
    });

    controller.middleware.send.use((bot, message, next) => {
        setTimeout(async () => {
            await next();
        }, 400);
    });

    controller.middleware.ingest.use(async (bot, message, next) => {
        message.touchedbyMiddleware = true;
        next();
    });

    

}