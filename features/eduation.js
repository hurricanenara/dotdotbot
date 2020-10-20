const { BotkitConversation } = require("botkit");
const masterArrayFunc = require('./thread_bank/master');
const mainQRFunc = require('./thread_bank/quick_replies');

module.exports = function(controller) {

    let educationMenu = new BotkitConversation('education', controller);
    
        async function typingIndicator(bot) {
            setTimeout(async() => {
                await bot.say({type: 'typing'}, 'main_thread');
            }, 1000)
        }

    controller.addDialog(educationMenu);

    educationMenu.before('default', async(convo, bot) => {
        setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread');
        }, 800)
        return new Promise(resolve => {
            setTimeout(resolve, 1600);
        }).catch(err => console.log(err))
    });

    educationMenu.say(`I have a B.S. from South Dakota School of Mines. My background is in Industrial Engineering and Human Factors.`);
    educationMenu.addAction('second')

    educationMenu.before('second', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'main_thread');
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        }).catch(err => console.log(err))
    });

    educationMenu.addMessage(`Ask me more or say 'main' to go back to the main menu`, 'second')
    //can add
};