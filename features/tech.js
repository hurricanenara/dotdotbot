const { BotkitConversation } = require("botkit");
const resume = require('./thread_bank/resume.json');
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {

    let aboutMenu = new BotkitConversation('about', controller);

    controller.addDialog(aboutMenu);

    startTyping(aboutMenu);

    aboutMenu.say(`I'm Nara! I recently graduated from App Academy and I live in New York.`);
    aboutMenu.addAction('second')

    startTyping(aboutMenu, 'second', 1500);

    aboutMenu.addMessage(`Ask me more or say 'main' to go back to the main menu`, 'second')
};