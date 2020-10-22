const { BotkitConversation } = require("botkit");
const resume = require('./thread_bank/resume.json');
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {

    let aboutMenu = new BotkitConversation('about', controller);
    
    controller.addDialog(aboutMenu);

    const { name, residence, background } = resume.about;
    const { college, major, bootcamp } = resume.education;


    startTyping(aboutMenu);

    aboutMenu.say(`I'm ${name}, and I'm a software engineer. I recently graduated from ${bootcamp} and I live in ${residence}. <br>I have a background in ${background.toLowerCase()} and I'm open to work`);
    aboutMenu.addAction('second')

    
    aboutMenu.addAction('second');

    startTyping(aboutMenu, 'second', 1500);

    
    aboutMenu.ask(`What else can I help you with?`, [
        {
            pattern: new RegExp(/(help?|hint|hmm|idk)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Let me help!`);
                return await bot.beginDialog('about_sub_qr');
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
            pattern: new RegExp(/(^tell me about yourself$|^tell me$)/),
            handler: async function(res, convo, bot) {
                await bot.say(`I just did :)`);
                return await convo.repeat();
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
                await bot.say(`Tech stack comin' up`);
                return await bot.beginDialog('projects');
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
    // aboutMenu.addMessage(`Choose from below to learn more about my experience:`, 'second')
    // aboutMenu.after(async(results, bot) => {
    //     await bot.beginDialog('about_sub_qr')
    // })
};