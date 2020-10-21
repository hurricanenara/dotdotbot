const { BotkitConversation } = require("botkit");
const startTyping = require('./thread_bank/typingIndicator');
const resume = require('./thread_bank/resume.json');

module.exports = function(controller) {

    let aboutMenu = new BotkitConversation('about', controller);
    const { name, residence, background } = resume.about;
    const { college, major, bootcamp } = resume.education;

    controller.addDialog(aboutMenu);

    startTyping(aboutMenu);

    aboutMenu.say(`I'm ${name}, and I'm a software engineer. I recently graduated from ${bootcamp} and I live in ${residence}.`);
    aboutMenu.addAction('second')

    startTyping(aboutMenu, 'second', 1500);

    aboutMenu.addAction('second');
    aboutMenu.addMessage(`I also have a background in ${background.toLowerCase()} and I'm open to work.`, 'second');
    
    aboutMenu.after(async(results, bot) => {
        await bot.beginDialog('about_sub_qr')
    })
};