const { BotkitConversation } = require("botkit");
const masterArrayFunc = require('./thread_bank/master');
const mainQRFunc = require('./thread_bank/quick_replies');

module.exports = function(controller) {

    let projectsMenu = new BotkitConversation('projects', controller);
    
        async function typingIndicator(bot) {
            setTimeout(async() => {
                await bot.say({type: 'typing'}, 'main_thread');
            }, 1000)
        }

    controller.addDialog(projectsMenu);

    projectsMenu.before('default', async(convo, bot) => {
        setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread');
        }, 800)
        // await bot.say(`I'm Nara! I recently graduated from App Academy and I live in New York.`);
        // typingIndicator(bot);
        return new Promise(resolve => {
            setTimeout(resolve, 1600);
        }).catch(err => console.log(err))
    });

    projectsMenu.say(`I'm Nara! I recently graduated from App Academy and I live in New York.`);
    projectsMenu.addAction('second')

    projectsMenu.before('second', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'main_thread');
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        }).catch(err => console.log(err))
    });

    projectsMenu.addAction('second');
    projectsMenu.addMessage(`Oh, and I just graduated from App Academy in August where I learned JavaScript, Ruby, and cool frameworks!`, 'second');
    // projectsMenu.addMessage(`Choose from below to learn more projects my experience:`, 'second')
    projectsMenu.after(async(results, bot) => {
        await bot.beginDialog('projects_sub_qr')
    })
    //can add
};