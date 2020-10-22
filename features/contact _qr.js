const { BotkitConversation } = require("botkit");
const resume = require('./thread_bank/resume.json');
const startTyping = require('./thread_bank/typingIndicator');
const contactQR = require('./thread_bank/quick_replies')('contact');

module.exports = function(controller) {

    let contactQR = new BotkitConversation('contact_qr', controller);

    controller.addDialog(contactQR);

    startTyping(contactQR);

    contactQR.ask({
        text: "",
        quick_replies: async(line, vars) => {
            return contactQR;
        }}, [], 'choice');

    contactQR.after(async(results, bot) => {
        await bot.say(`You said ${results.choice}`);
        console.log(results);
        if (results.choice !== 'back') {
            await bot.beginDialog(results.choice)
        } else {
            await bot.beginDialog('main_thread_qr')
        }
    });

    // linkedin thread/convo
    let linkedin = new BotkitConversation('linkedin', controller);

    controller.addDialog(linkedin);

    startTyping(linkedin);

    linkedin.addMessage(`My LinkedIn profile is ${`<https://www.linkedin.com/in/naraskim/>`}`)
    linkedin.addAction('second')

    startTyping(linkedin, 'second', 1500);

    // linkedin.addMessage(``, 'second');

    linkedin.after(async(results, bot) => {
        await bot.say({type: 'typing'});
        await bot.beginDialog('contact_qr');
    })
}