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
    projectsMenu.ask(`What else would you like to know?`, [
        {
            pattern: new RegExp(/(help?|hint|hmm|idk|they|show|prove)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Here they are:`);
                return await bot.beginDialog('projects_sub_qr');
            }
        },
        {
            pattern: new RegExp(/(work|history|experiences?)/),
            handler: async function(res, convo, bot) {
                await bot.say(`You want to know about my work history`);
                return await bot.beginDialog('experience');
            }
        },
        {
            pattern: new RegExp(/(educationa?l?|academics|majors?|background|school)/),
            handler: async function(res, convo, bot) {
                await bot.say(`You want to learn about my academic background`);
                return await bot.beginDialog('education');
            }
        },
        {
            pattern: new RegExp(/(languages?|tech|stack)/),
            handler: async function(res, convo, bot) {
                await bot.say(`You want to learn about my tech stack`);
                return await bot.beginDialog('techStack');
            }
        },
        {
            pattern: new RegExp(/(tell|yourself)/),
            handler: async function(res, convo, bot) {
                await bot.say(`I'd love to`);
                return await bot.beginDialog('about');
            }
        },
        {
            pattern: new RegExp(/(facts)/),
            handler: async function(res, convo, bot) {
                // await bot.say(`Gotcha.`);
                return await bot.beginDialog('fun_facts');
            }
        },
        {
            pattern: new RegExp(/(who)/),
            handler: async function(res, convo, bot) {
                // await bot.say(`Gotcha.`);
                return await bot.beginDialog('about');
            }
        },
        {
            pattern: new RegExp(/(projects?|portfolio)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Want to hear it again?`);
                return await convo.repeat();
            }
        },
        {
            pattern: new RegExp(/(contact|email|git|github|linkedin)/),
            handler: async function(res, convo, bot) {
                await bot.say(`One moment...`);
                return await bot.beginDialog('contact');
            }
        },
        {
            default: true,
            handler: async (res, convo, bot) => {
                await bot.say(`Sorry, I don't understand`);
                return await convo.repeat();
            }
        }
    ], 'res', 'second');
    // projectsMenu.addMessage(`Choose from below to learn more projects my experience:`, 'second')
    // projectsMenu.after(async(results, bot) => {
    //     await bot.beginDialog('projects_sub_qr')
    // });
};