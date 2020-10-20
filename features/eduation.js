const { BotkitConversation } = require("botkit");
const masterArrayFunc = require('./thread_bank/master');
const mainQRFunc = require('./thread_bank/quick_replies');

module.exports = function(controller) {

    let educationMenu = new BotkitConversation('education', controller);
    
        async function typingIndicator(bot) {
            setTimeout(async() => {
                await bot.say({type: 'typing'}, 'education');
            }, 1000)
        }

    controller.addDialog(educationMenu);

    educationMenu.before('default', async(convo, bot) => {
        setTimeout(async() => {
            await bot.say({type: 'typing'}, 'education');
        }, 800)
        return new Promise(resolve => {
            setTimeout(resolve, 1600);
        }).catch(err => console.log(err))
    });

    educationMenu.say(`I have a B.S. from South Dakota School of Mines. My background is in Industrial Engineering and Human Factors.`);

    educationMenu.before('second', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'education');
        return new Promise(resolve => {
            setTimeout(resolve, 3000);
        }).catch(err => console.log(err))
    });

    educationMenu.addAction('second');
    educationMenu.addMessage(`Oh, and I just graduated from App Academy in August where I learned JavaScript, Ruby, and cool frameworks!`, 'second');
    // educationMenu.addMessage(`Choose from below to learn more about my experience:`, 'second')
    educationMenu.after(async(results, bot) => {
        await bot.beginDialog('experience_sub_qr')
    })
    //can add
};