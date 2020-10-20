const { BotkitConversation } = require("botkit");
const masterArrayFunc = require('./thread_bank/master');
const mainQRFunc = require('./thread_bank/quick_replies');

module.exports = function(controller) {

    let experienceMenu = new BotkitConversation('experience', controller);
    
        async function typingIndicator(bot) {
            setTimeout(async() => {
                await bot.say({type: 'typing'}, 'main_thread');
            }, 1000)
        }

    controller.addDialog(experienceMenu);

    experienceMenu.before('default', async(convo, bot) => {
        setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread');
        }, 800)
        return new Promise(resolve => {
            setTimeout(resolve, 1600);
        }).catch(err => console.log(err))
    });

    experienceMenu.say(`I have 4 years of experience as an analyst and handful of engineering internships.`);
    experienceMenu.addAction('second')

    experienceMenu.before('second', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'main_thread');
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        }).catch(err => console.log(err))
    });
    experienceMenu.addAction('second');
    // experienceMenu.addMessage(`Choose from below to learn more about my experience:`, 'second')
    experienceMenu.after(async(results, bot) => {
        await bot.beginDialog('experience_sub_qr')
    })
    //can add
};