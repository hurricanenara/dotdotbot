const { BotkitConversation } = require("botkit");
const resume = require('./thread_bank/resume.json');
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {

    let contact = new BotkitConversation('contact', controller);

    controller.addDialog(contact);

    startTyping(contact);

    contact.say(`You can reach me via the below methods of contact: ${`<br><br>`} LinkedIn: ${`<https://www.linkedin.com/in/naraskim/><br>`} Github: <https://github.com/hurricanenara><br> Email: naralee0124@gmail.com`);
    contact.addAction('second');

    startTyping(contact, 'second', 800)

    contact.addQuestion('You can end this chat by saying end or say continue to go back to the main menu', [
        {
            pattern: new RegExp(/(end|quit|bye)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Thanks for stopping by! Good bye!`);
                return await bot.cancelAllDialogs();
            }
        },
        {
            pattern: new RegExp(/(continue|more)/),
            handler: async function(res, convo, bot) {
                // await bot.say(`You want to know about my work history`);
                return await bot.beginDialog('main_thread_repeat');
            }
        }], 'decision', 'second');
};