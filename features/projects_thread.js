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
            pattern: new RegExp(/(help?|hint|hmm|idk|they|show|prove|see them\?*|^[t|T]ell me more)/),
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
            pattern: new RegExp(/([a|A]re you open to work\?$)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Yes! I'm looking to join a team of ambitious individuals where I can contribute and learn.`);
                return await bot.beginDialog('contact');
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
            pattern: new RegExp(/(facts|^tell me fun facts about yourself$)/),
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
                await bot.say(`One second...`);
                return await bot.beginDialog('contact');
            }
        },
        {
            pattern: new RegExp(/(resume)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Here's my resume...<br> <a href="https://drive.google.com/file/d/1_2cHoazI1LB68rk5k40v-GGUEUKqY-t0/view target="_blank" >here</a> you go!`);
                return await bot.beginDialog('main_thread_repeat');
            }
        },
        {
            pattern: new RegExp(/(name\?$)/),
            handler: async function(res, convo, bot) {
                await bot.say(`My name is Nara.`);
                return await bot.beginDialog('main_thread_repeat');
            }
        },
        {
            pattern: new RegExp(/(speak\?+$)/),
            handler: async function(res, convo, bot) {
                await bot.say(`I'm fluent in Korean and English.`);
                return await bot.beginDialog('main_thread_repeat');
            }
        },
        {
            pattern: new RegExp(/(from\?+$)/),
            handler: async function(res, convo, bot) {
                await bot.say(`I grew up in Korea, England and the US.`);
                return await bot.beginDialog('main_thread_repeat');
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