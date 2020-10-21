const { BotkitConversation } = require("botkit");
const masterArrayFunc = require('./thread_bank/master');
const mainQRFunc = require('./thread_bank/quick_replies');

module.exports = function(controller) {

    let aboutMenu = new BotkitConversation('about', controller);

    controller.addDialog(aboutMenu);

    aboutMenu.before('default', async(convo, bot) => {
        setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread');
        }, 800)
        // await bot.say(`I'm Nara! I recently graduated from App Academy and I live in New York.`);
        // typingIndicator(bot);
        return new Promise(resolve => {
            setTimeout(resolve, 1600);
        });
    });

    aboutMenu.say(`I'm Nara! I recently graduated from App Academy and I live in New York.`);
    aboutMenu.addAction('second')

    aboutMenu.before('second', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'main_thread');
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    });

    aboutMenu.addMessage(`Ask me more or say 'main' to go back to the main menu`, 'second')
    //can add
};