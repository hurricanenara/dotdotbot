const { BotkitConversation } = require("botkit");
const resume = require('./thread_bank/resume.json');
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {

    let techStack = new BotkitConversation('techStack', controller);

    controller.addDialog(techStack);

    startTyping(techStack);

    techStack.say(`I'm proficient in Ruby/Rails, JavaScript, and SQL <br>I'm currently learning Python and C++`);
    techStack.addAction('second')

    startTyping(techStack, 'second', 1500);

    techStack.ask(`What else can I answer for you?`, [
        {
            pattern: new RegExp(/(help?|hint|hmm|idk)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Here they are:`);
                return await bot.beginDialog('main_thread_qr');
            }
        },
        {
            pattern: new RegExp(/(resume)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Here's my resume...<br> <a href="https://drive.google.com/file/d/1_2cHoazI1LB68rk5k40v-GGUEUKqY-t0/view target="_blank">here</a> you go!`);
                return await bot.beginDialog('main_thread_repeat');
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
                await bot.say(`I'll repeat for you`);
                return await bot.beginDialog('techStack');
            }
        },
        {
            pattern: new RegExp(/(^tell me about yourself$|^tell me$)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Sure thing!`);
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
                await bot.say(`Fetching my projects...`);
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
            default: true,
            handler: async (res, convo, bot) => {
                await bot.say(`Sorry, I don't understand`);
                return await convo.repeat();
            }
        }
    ], 'res', 'second');
};