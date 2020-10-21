const { BotkitConversation } = require('botkit');
const startTyping = require('./thread_bank/typingIndicator');
const mainQr = require('./thread_bank/quick_replies')('main');

module.exports = function(controller) {

    let mainThreadQR = new BotkitConversation('main_thread_qr', controller);

    controller.addDialog(mainThreadQR);

    startTyping(mainThreadQR);
    
    mainThreadQR.ask({
        text: 'Choose from below to learn more about me:',
        quick_replies: async(line, vars) => {
            return mainQr
        }
    }, [], 'choice');

    mainThreadQR.after(async(results, bot) => {
        await bot.say(`You said ${results.choice}`);
        console.log(results);
        await bot.beginDialog(results.choice)
    });
}