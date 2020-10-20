const { BotkitConversation } = require("botkit");
const masterArrayFunc = require('./master');
const mainQRFunc = require('./quick_replies');

module.exports = function(controller) {

    let aboutMenu = new BotkitConversation('about_thread', controller);

    controller.addDialog(aboutMenu);

    async function typingIndicator(bot) {
        setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread');
        }, 1000)
    }

    aboutMenu.before('default', async(convo, bot) => {
        await bot.say(`I'm Nara! I recently graduated from App Academy and I live in New York.`);
        // typingIndicator(bot);
        // setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread');
        // }, 1000)
        return new Promise(resolve => {
            setTimeout(resolve, 800);
        }).catch(err => console.log(err))
    });
}