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
                await bot.say(`You said help`);
                return await bot.beginDialog('main_thread_qr');
            }
        },
        {
            pattern: 'work history',
            handler: async function(res, convo, bot) {
                await bot.say(`You said work history`);
                return await bot.beginDialog('experience');
            }
        },
        {
            pattern: 'school' || 'education' || 'major',
            handler: async function(res, convo, bot) {
                await bot.say(`You want to learn about my academic background`);
                return await bot.beginDialog('education');
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