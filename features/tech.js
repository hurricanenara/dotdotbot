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
                await bot.say(`I'll repeat for you`);
                return await bot.beginDialog('techStack');
            }
        },
        {
            pattern: new RegExp(/(tell|yourself)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Gotcha.`);
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