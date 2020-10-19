const { BotkitConversation } = require("botkit");

module.exports = function(controller) {
    let main = new BotkitConversation('main_thread', controller);
    controller.addDialog(main);

    async function typingIndicator(bot) {
        setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread');
        }, 1000)
    }

    main.before('default', async(convo, bot) => {
        // await bot.say('BEFORE DEFAULT!');
        // typingIndicator(bot);
        // setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread');
        // }, 1000)
        return new Promise(resolve => {
            setTimeout(resolve, 800);
        }).catch(err => console.log(err))
    });

    main.say('this is the main thread!')
}