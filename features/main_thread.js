const { BotkitConversation } = require("botkit");
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {

    const mainMenu = new BotkitConversation('main_thread', controller);

    controller.addDialog(mainMenu);

    startTyping(mainMenu);

    mainMenu.ask(`Ask me something or say 'help'`, [
        {
            pattern: new RegExp(/(help?|hint|hmm|idk)/),
            handler: async function(res, convo, bot) {
                await bot.say(`You said help`);
                return await bot.beginDialog('main_thread_qr');
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
            pattern: new RegExp(/(educationa?l?|academics|majors?|background)/),
            handler: async function(res, convo, bot) {
                await bot.say(`You want to learn about my academic background`);
                return await bot.beginDialog('education');
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
            pattern: new RegExp(/(languages?|tech|stack)/),
            handler: async function(res, convo, bot) {
                await bot.say(`You want to learn about my tech stack`);
                return await bot.beginDialog('techStack');
            }
        },
        {
            pattern: new RegExp(/(tell|yourself)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Okay. Here goes...`);
                return await bot.beginDialog('about');
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
            pattern: new RegExp(/(projects?|portfolio)/),
            handler: async function(res, convo, bot) {
                await bot.say(`You want to know more about my projects, no problem.`);
                return await bot.beginDialog('projects');
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
            pattern: new RegExp(/([a|A]re you open to work\?$)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Yes! I'm looking to join a team of ambitious individuals where I can contribute and learn.`);
                return await bot.beginDialog('contact');
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
    ], {key: 'res'});
}