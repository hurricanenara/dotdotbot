const { BotkitConversation } = require("botkit");
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {

    let projectsMenu = new BotkitConversation('projects', controller);
    
    controller.addDialog(projectsMenu);

    startTyping(projectsMenu);

    projectsMenu.say(`Not including myself (the awesome chatbot), I have complete three beaufiful and functional projects.`);
    projectsMenu.addAction('second');

    startTyping(projectsMenu, 'second', 1500)

    projectsMenu.addAction('second');
    projectsMenu.addMessage(`Check them out below:`, 'second');
    // projectsMenu.addMessage(`Choose from below to learn more projects my experience:`, 'second')
    projectsMenu.after(async(results, bot) => {
        await bot.beginDialog('projects_sub_qr')
    });
};