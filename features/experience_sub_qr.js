const { BotkitConversation } = require('botkit');
const masterArrayFunc = require('./thread_bank/master');
const QRFunc = require('./thread_bank/quick_replies');

const expQR = QRFunc('experience');

module.exports = function(controller) {

    let expSubQR = new BotkitConversation('experience_sub_qr', controller);

    controller.addDialog(expSubQR);

    async function typingIndicator(bot) {
        setTimeout(async() => {
            await bot.say({type: 'typing'}, 'experience_sub_qr');
        }, 1000)
    }

    expSubQR.before('default', async(convo, bot) => {
        // await bot.say('BEFORE DEFAULT!');
        // typingIndicator(bot);
        // setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread');
        // }, 1000)
        return new Promise(resolve => {
            setTimeout(resolve, 800);
        }).catch(err => console.log(err))
    });

    // console.log(controller, "THIS IS CONTROLLER");

    expSubQR.ask({
        text: 'Choose from below to learn more about me:',
        quick_replies: async(line, vars) => {
            return expQR
        }
    }, [], 'choice');

    expSubQR.after(async(results, bot) => {
        await bot.say(`you said ${results.choice}`);
        console.log(results);
        await bot.beginDialog(results.choice)
    })
}