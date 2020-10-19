const { BotkitConversation } = require("botkit");

// module.exports = function(controller) {
//     let convo = new BotkitConversation('test_convo', controller);
//     controller.addDialog(convo);

//     convo.before('default', async(convo, bot) => {
//         setTimeout(async() => {
//             await bot.say('BEFORE DEFAULT!');
//             await bot.say({type: 'typing'}, 'test_convo');
//         }, 1000)
//         convo.setVar('count', 0);
//         return new Promise(resolve => {
//             setTimeout(resolve, 2000);
//         })
//     });

//     convo.say('This is the default thread.');
//     convo.addAction('second');

//     convo.before('second', async(convo, bot) => { 
//         setTimeout(async() => {
//             // setTimeout(async() => {
//             //     await bot.say({type: 'typing'}, 'test_convo');
//             // })
//             await bot.say('BEFORE SECOND');
//             await bot.say({type: 'typing'}, 'test_convo');
//         }, 1000)
//         convo.setVar('count', convo.vars.count + 1);
//         if (convo.vars.count > 2) {
//             await convo.gotoThread('third');
//         }
//         return new Promise(resolve => {
//             setTimeout(resolve, 2000);
//         })
//     });
//     convo.addMessage('This is the second thread round {{vars.count}}', 'second');

//     // convo.addAction('second','second');

//     // convo.before('third', async(convo, bot) => {
//     //     await bot.say('BEFORE THIRD');
//     // });

//     // convo.addMessage('This is third','third');
//     // convo.addQuestion('What do you think', async(response, convo, bot) => {
//     //     await convo.gotoThread('fourth');
//     // }, 'think', 'third');

//     // convo.before('fourth', async(convo, bot) => {
//     //     await bot.say('BEFORE FOURTH!!!');
//     // });
//     // convo.addMessage('this is the fourth thread', 'fourth');
//     // convo.addQuestion('Will this work?', [], 'work', 'fourth');

//     // convo.onChange('work', async(response, convo, bot) => {
//     //     await convo.gotoThread('fifth');
//     // });

//     // convo.before('fifth', async(convo, bot) => {
//     //     await bot.say('BEFORE FIFTH!!!');
//     // });
//     // convo.addMessage('this is the fifth thread','fifth');
//     // convo.addAction('default', 'fifth');




//     controller.hears('testme', 'direct_message,message', async(bot, message) => { 
//         await bot.beginDialog('test_convo');
//     });
// }

module.exports = function(controller) {
    let convo = new BotkitConversation('test_convo', controller);
    controller.addDialog(convo);


    // convo.addAction('typing', 'second');
    // convo.addAction('default','typing');
    // trigger a gotoThread, which gives us an opportunity to delay the next message
    // convo.addAction('default','typing');

    // convo.addMessage('typed!','default');
    convo.before('default', async(convo, bot, next) => {
        await bot.say("I was called before default");
        setTimeout(async() => {
            await bot.say({type: 'typing'})
        }, 500)
        convo.setVar('counter', 0);
        return new Promise((resolve) => {
            setTimeout(resolve, 1300);
        })
    });
    convo.say('This is the default thread.');
    // convo.addAction('typing');

    // // start the typing indicator
    
    // convo.addAction('default', 'typing')
    // convo.addMessage({type: 'typing'})
    
    convo.addAction('next_thread')
    convo.addMessage(`Ask me something or type 'help'`, 'next_thread');
    // convo.addMessage({typing: true})

    convo.before('next_thread', async(convo, bot) => {
        setTimeout(async() => {
            await bot.say({type: 'typing'})
        }, 400);
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        })
    })
    
    // convo.addMessage({type: 'typing'}, 'default');
    // convo.addAction('second')
    convo.addAction('second', 'second');
    

    convo.before('second', async(convo, bot) => {
        await bot.say("I was called before second")
        convo.setVar('counter', convo.vars.counter + 1);
        if (convo.vars.counter > 2) await convo.gotoThread('third');
        return new Promise(resolve => {
            setTimeout(resolve, 800);
        })
    })
    convo.addMessage("This is the second thread {{vars.counter}}", 'second');
    convo.addAction('second', 'second');

    convo.before('third', async(convo, bot) => {
        await bot.say('I was called before third message');
    })
    convo.addMessage('this is third', 'third');

    controller.hears('test me', 'direct_message,message', async(bot, message) => {
        // await bot.reply(message, {type: 'typing'});
        // setTimeout(async() => {
        //     await bot.changeContext(message.reference);
            await bot.beginDialog('test_convo');
        // }, 1500);
    })
}