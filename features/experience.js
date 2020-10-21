const { BotkitConversation } = require("botkit");
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {

    let experienceMenu = new BotkitConversation('experience', controller);

    controller.addDialog(experienceMenu);

    startTyping(experienceMenu);

    experienceMenu.say(`I have 4 years of experience as an analyst and handful of engineering internships.`);
    experienceMenu.addAction('second')

    startTyping(experienceMenu, 'second', 1500);

    experienceMenu.addAction('second');
    // experienceMenu.addMessage(`Choose from below to learn more about my experience:`, 'second')
    experienceMenu.after(async(results, bot) => {
        await bot.beginDialog('experience_sub_qr')
    })
};