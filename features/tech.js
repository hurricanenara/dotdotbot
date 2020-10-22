const { BotkitConversation } = require("botkit");
const resume = require('./thread_bank/resume.json');
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {

    let techStack = new BotkitConversation('techStack', controller);

    controller.addDialog(techStack);

    startTyping(techStack);

    techStack.say(`I'm proficient in Ruby/Rails, JavaScript, and SQL`);
    techStack.addAction('second')

    startTyping(techStack, 'second', 1500);

    techStack.addMessage(`and I'm currently learning Python and C++`, 'second')
};