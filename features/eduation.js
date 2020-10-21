const { BotkitConversation } = require("botkit");
const resume = require('./thread_bank/resume.json');
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {

    let educationMenu = new BotkitConversation('education', controller);
    
    controller.addDialog(educationMenu);

    startTyping(educationMenu);

    educationMenu.say(`I have a B.S. from South Dakota School of Mines. My background is in Industrial Engineering and Human Factors.`);

    startTyping(educationMenu, 'second', 1500)

    educationMenu.addAction('second');
    educationMenu.addMessage(`Oh, and I just graduated from App Academy in August where I learned JavaScript, Ruby, and cool frameworks!`, 'second');
    // educationMenu.addMessage(`Choose from below to learn more about my experience:`, 'second')
    educationMenu.after(async(results, bot) => {
        await bot.beginDialog('education_sub_qr')
    })
    //can add
};