const { BotkitConversation } = require('botkit');
const masterArrayFunc = require('./thread_bank/master');
const mainQRFunc = require('./thread_bank/quick_replies');

const mainQr = mainQRFunc('main');

module.exports = function(controller) {

    let dialog = new BotkitConversation('dynamic_attachments', controller);   
    dialog.ask({
        text: null,
        quick_replies: mainQr
    }, [], 'name');

    dialog.ask({
        text: 'Your name is:',
        quick_replies: async(line, vars) => {
            return [
                {
                    title: 'Foo',
                    payload: 'foo',
                },
                {
                    title: 'Bar',
                    payload: 'bar',
                },
                {
                    title: vars.name,
                    payload: vars.name
                }
            ]
        }
    }, [], 'menu');

    dialog.say({
        text: 'Does this sound right?',
        quick_replies: async(line, vars) => {
            return [
                {
                    title: `Your name is ${vars.name} and you chose ${vars.menu}`
                }
            ];
        }
    });
    controller.addDialog(dialog);

    controller.hears('dynamic', 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.beginDialog('dynamic_attachments');
    });

}