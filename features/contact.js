const { BotkitConversation } = require("botkit");
const resume = require('./thread_bank/resume.json');
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {

    let contact = new BotkitConversation('contact', controller);

    controller.addDialog(contact);

    startTyping(contact);

    contact.say(`I'm Nara! I recently graduated from App Academy and I live in New York.`);
    contact.addAction('second');

    startTyping(contact, 'second', 1500);

    contact.addMessage(`Ask me more or say 'main' to go back to the main menu`, 'second')
};