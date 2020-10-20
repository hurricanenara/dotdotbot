const { BotkitConversation } = require('botkit');
const masterArrayFunc = require('./thread_bank/master');
const mainQRFunc = require('./thread_bank/quick_replies');

const mainQr = mainQRFunc('main');

module.exports = function(controller) {

    let mainThreadQR = new BotkitConversation('main_thread_qr', controller);

    controller.addDialog(mainThreadQR);

    async function typingIndicator(bot) {
        setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread_qr');
        }, 1000)
    }

    mainThreadQR.before('default', async(convo, bot) => {
        // await bot.say('BEFORE DEFAULT!');
        // typingIndicator(bot);
        // setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread');
        // }, 1000)
        return new Promise(resolve => {
            setTimeout(resolve, 800);
        }).catch(err => console.log(err))
    });

    // console.log(controller, "THIS IS CONTROLLER");

    mainThreadQR.ask({
        text: 'Choose from below to learn more about me:',
        quick_replies: async(line, vars) => {
            return mainQr
        }
    }, [], 'choice');

    mainThreadQR.after(async(results, bot) => {
        await bot.say(`you said ${results.choice}`);
        console.log(results);
        await bot.beginDialog(results.choice)
    })
//     mainThreadQR.ask(`Ask me something or say 'help'`, [
//         {
//             pattern: 'help',
//             handler: async function(answer, convo, bot) {
//                 console.log('YES HANDLER');
//                 console.log(convo);
//                 await bot.say(`You said help`);
//                 // return await convo.gotoThread('main_thread_qr_intro');
//                 return await bot.beginDialog('main_thread_qr');
//             }
//         },
//         {
//             default: true,
//             handler: async (answer, convo, bot) => {
//                 console.log('FALLBACK HANDLER');
//                 await convo.repeat();
//                 // do nothing
//             }
//         }
//     ], {key: 'answer'});
// }

// module.exports = function(controller) {

//     let dialog = new BotkitConversation('main_thread_qr', controller);
//     controller.addDialog(dialog);

//     dialog.before('default', async(convo, bot) => {
//         await bot.say({type: 'typing'}, 'main_thread_qr');
//         return new Promise(resolve => {
//             setTimeout(resolve, 800);
//         }).catch(err => console.log(err))
//     });

//     dialog.ask({
//         text: 'Choose from below to learn more about me:',
//         quick_replies: mainQr
//     }, [], 'choice');

//     dialog.ask('You chose {{vars.choice}}, is that right?', [
//         {
//             pattern: 'yes',
//             handler: async function(answer, convo, bot) {
//                 // convo.setVar('res', vars.choice)
//                 console.log(vars.choice, '!!!!!!!!')
//                 console.log('YES HANDLER!!!!!!!!!!');
//                 console.log(convo);
//                 // await bot.say(`You said help`);
//                 return await bot.beginDialog(vars.choice);
//             }
//         },
//         {
//             pattern: 'no',
//             handler: async function(answer, convo, bot) {
//                 // await bot.say(`You said help`);
//                 await convo.repeat();
//             }
//         },
//         {
//             default: true,
//             handler: async (answer, convo, bot) => {
//                 console.log('FALLBACK HANDLER');
//                 await convo.repeat();
//                 // do nothing
//             }
//         }
//     ], {key: 'answer'});

//     dialog.addMessage('Hooray for tacos!', 'tack');

//     // dialog.ask({
//     //     text: 'You chose {{vars.choice}}',
//     //     quick_replies: async(line, vars) => {
//     //         return [
//     //             {
//     //                 title: 'Foo',
//     //                 payload: 'foo',
//     //             },
//     //             {
//     //                 title: 'Bar',
//     //                 payload: 'bar',
//     //             },
//     //             {
//     //                 title: vars.choice,
//     //                 payload: vars.choice
//     //             }
//     //         ]
//     //     }
//     // }, [], 'menu');

//     // dialog.say({
//     //     text: 'Does this sound right?',
//     //     quick_replies: async(line, vars) => {
//     //         return [
//     //             {
//     //                 title: `Your choice is ${vars.choice} and you chose ${vars.menu}`
//     //             }
//     //         ];
//     //     }
//     // });
    

//     // controller.hears('dynamic', 'message,direct_message,direct_mention', async(bot, message) => {
//     //     await bot.beginDialog('main_thread_qr');
//     // });

// }
}