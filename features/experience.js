const { BotkitConversation } = require("botkit");
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {

    let experienceMenu = new BotkitConversation('experience', controller);

    controller.addDialog(experienceMenu);

    startTyping(experienceMenu);

    experienceMenu.say(`I have 4 years of experience as an analyst and handful of engineering internships.`);
    experienceMenu.addAction('second')

    startTyping(experienceMenu, 'second', 1500);

    experienceMenu.addAction('second');
    experienceMenu.ask(`Okay, what else would you like to learn about me?`, [
        {
            pattern: new RegExp(/(help?|hint|hmm|idk|^[t|T]ell me more)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Sure!`);
                return await bot.beginDialog('experience_sub_qr');
            }
        },
        {
            pattern: new RegExp(/(work|history|experiences?)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Let me repeat that for you`);
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
            pattern: new RegExp(/(^tell me about yourself$|^tell me$)/),
            handler: async function(res, convo, bot) {
                await bot.say(`I can do that!`);
                return await bot.beginDialog('about');
            }
        },
        {
            pattern: new RegExp(/(^tell me again$)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Okay, sure`);
                return await bot.beginDialog('about');
            }
        },
        {
            pattern: new RegExp(/(facts|^tell me fun facts about yourself$)/),
            handler: async function(res, convo, bot) {
                return await bot.beginDialog('fun_facts');
            }
        },
        {
            pattern: new RegExp(/(who)/),
            handler: async function(res, convo, bot) {
                return await bot.beginDialog('about');
            }
        },
        {
            pattern: new RegExp(/(projects?|portfolio)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Tech stack comin' up`);
                return await bot.beginDialog('techStack');
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
            pattern: new RegExp(/(resume)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Here's my resume...<br> <a href="https://drive.google.com/file/d/1_2cHoazI1LB68rk5k40v-GGUEUKqY-t0/view target="_blank" >here</a> you go!`);
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
    // experienceMenu.after(async(results, bot) => {
    //     await bot.beginDialog('experience_sub_qr')
    // })
};