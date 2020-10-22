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
    educationMenu.ask(`What else can I help you with?`, [
        {
            pattern: new RegExp(/(help?|hint|hmm|idk)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Let me assist`);
                return await bot.beginDialog('education_sub_qr');
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
                await bot.say(`I can repeat`);
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
                await bot.say(`Sure!`);
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
                await bot.say(` <a href="https://drive.google.com/file/d/1_2cHoazI1LB68rk5k40v-GGUEUKqY-t0/view">Here</a> you go!`);
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
    // educationMenu.addMessage(`Choose from below to learn more about my experience:`, 'second')
    // educationMenu.after(async(results, bot) => {
    //     await bot.beginDialog('education_sub_qr')
    // })
    //can add
};