const { BotkitConversation } = require("botkit");
const resume = require('./thread_bank/resume.json');
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {

    let aboutMenu = new BotkitConversation('about', controller);
    
    controller.addDialog(aboutMenu);

    const { name, residence, background } = resume.about;
    const { college, major, bootcamp } = resume.education;


    startTyping(aboutMenu);

    aboutMenu.say(`I'm ${name}, and I'm a software engineer. I recently graduated from ${bootcamp} and I live in ${residence}.`);
    aboutMenu.addAction('second')

    startTyping(aboutMenu, 'second', 1500);

    aboutMenu.addAction('second');
    aboutMenu.addMessage(`I also have a background in ${background.toLowerCase()} and I'm open to work.`, 'second');
    // aboutMenu.addMessage(`Choose from below to learn more about my experience:`, 'second')
    aboutMenu.after(async(results, bot) => {
        await bot.beginDialog('about_sub_qr')
    })
};