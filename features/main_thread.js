const { BotkitConversation } = require("botkit");
const masterArrayFunc = require('./thread_bank/master');
const mainQRFunc = require('./thread_bank/quick_replies');

const masterArray = masterArrayFunc();
const mainQr = mainQRFunc('main');

module.exports = function(controller) {

    let mainMenu = new BotkitConversation('main_thread', controller);
    const mainThread = masterArray[0]['script'][1]['script'][0];
    const helpText = mainThread['text'][0];

    controller.addDialog(mainMenu);

    async function typingIndicator(bot) {
        setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread');
        }, 1000)
    }

    mainMenu.before('default', async(convo, bot) => {
        // await bot.say('BEFORE DEFAULT!');
        // typingIndicator(bot);
        // setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread');
        // }, 1000)
        return new Promise(resolve => {
            setTimeout(resolve, 800);
        }).catch(err => console.log(err))
    });

    // mainMenu.ask(`Ask me something of say 'help'`, async(response, convo, bot, full_message) => {
    //     await bot.say(`You said ${response}`);
    //     if (respone === 'help') {
    //         await convo.gotoThread('main_thread_qr');
    //     } else {
    //         convo.repeat
    //     }
    // }, {key: 'name'}, 'default');

    mainMenu.ask(`Ask me something or say 'help'`, [
        {
            pattern: 'help',
            handler: async function(answer, convo, bot) {
                console.log('YES HANDLER');
                console.log(convo);
                await bot.say(`You said help`);
                // return await convo.gotoThread('main_thread_qr_intro');
                return await bot.beginDialog('main_thread_qr');
            }
        },
        {
            pattern: 'about',
            handler: async function(answer, convo, bot) {
                // return await convo.gotoThread('main_thread_qr_intro');
                return await bot.beginDialog('about');
            }
        },
        {
            pattern: 'experience',
            handler: async function(answer, convo, bot) {
                // return await convo.gotoThread('main_thread_qr_intro');
                return await bot.beginDialog('experience');
            }
        },
        {
            pattern: 'education',
            handler: async function(answer, convo, bot) {
                // return await convo.gotoThread('main_thread_qr_intro');
                return await bot.beginDialog('education');
            }
        },
        {
            pattern: 'tech stack',
            handler: async function(answer, convo, bot) {
                // return await convo.gotoThread('main_thread_qr_intro');
                return await bot.beginDialog('tech_stack');
            }
        },
        {
            pattern: 'contact',
            handler: async function(answer, convo, bot) {
                // return await convo.gotoThread('main_thread_qr_intro');
                return await bot.beginDialog('contact');
            }
        },
        {
            default: true,
            handler: async (answer, convo, bot) => {
                console.log('FALLBACK HANDLER');
                await convo.repeat();
                // do nothing
            }
        }
    ], {key: 'answer'});

    
    // mainMenu.addMessage('Choose from below to learn more about me:', 'main_thread_qr_intro');
    // mainMenu.after(async(restuls, bot) => {
    //     await bot.beginDialog('dynamic_attachments');
    // })

    // mainMenu.before('main_thread_qr', async(convo, bot) => {
    //     mainMenu.ask(`Ask me something of say 'help'`, async(response, convo, bot, full_message) => {
    //     await bot.say(`You said ${response}`);
    // }, {key: 'name'});
    //     // await bot.say('BEFORE DEFAULT!');
    //     // typingIndicator(bot);
    //     // setTimeout(async() => {
    //         // await bot.say({type: 'typing'}, 'main_thread');
    //     // }, 1000)
    //     return new Promise(resolve => {
    //         setTimeout(resolve, 800);
    //     }).catch(err => console.log(err))
    // });


    // mainMenu.ask(`Ask me something of say 'help'`, async(response, convo, bot, full_message) => {
    //     await bot.say(`You said ${response}`);
    // });

    // mainMenu.ask(helpText, [
    //     {
    //         pattern: 'help',
    //         handler: async function(answer, convo, bot) {
    //             console.log('YES HANDLER');
    //             // console.log(convo);
    //             return await convo.gotoThread('main_thread_qr');
    //         }
    //     },
    //     {
    //         pattern: 'no',
    //         handler: async function(answer, convo, bot) { 
    //             console.log(' NO HANDLER');
    //             await convo.gotoThread('bar');
    //         }
    //     },
    //     {
    //         default: true,
    //         handler: async (answer, convo, bot) => {
    //             console.log('FALLBACK HANDLER');
    //             await convo.repeat();
    //             // do nothing
    //         }
    //     }
    // ]);

    // mainMenu.ask({
    //     text: 'Choose from below to learn more about me:!',
    //     quick_replies: mainQr,
    // }, async(response, convo, bot) => {
    //     await convo.gotoThread('about_thread');
    // }, 'aboutme', 'third');



    // mainMenu.addMessage('NOOOOOO', 'bar');
}