const { BotkitConversation } = require("botkit");
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {

    const mainMenu = new BotkitConversation('main_thread', controller);

    controller.addDialog(mainMenu);

    startTyping(mainMenu);

    mainMenu.ask(`Ask me something or say 'help'`, [
        {
            pattern: 'help',
            handler: async function(res, convo, bot) {
                console.log(convo);
                await bot.say(`You said help`);
                return await bot.beginDialog('main_thread_qr');
            }
        },
        {
            default: true,
            handler: async (res, convo, bot) => {
                await convo.repeat();
            }
        }
    ], {key: 'res'});
}