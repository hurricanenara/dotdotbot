const { BotkitConversation } = require("botkit");
const masterArrayFunc = require('./thread_bank/master');
const funFunc = require('./thread_bank/quick_replies');

module.exports = function(controller) {
    
    let ffMenu = new BotkitConversation('fun_facts', controller);
    const funArr = funFunc('fun');
    const randIdx = () => Math.floor(Math.random() * funArr.length);
    controller.addDialog(ffMenu);
    

    ffMenu.before('default', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'fun_facts');
        convo.setVar('random', funArr[0]);
        convo.setVar('count', 0);
        return new Promise(resolve => {
        setTimeout(resolve, 1400);
        })
    });

    // convo.addMessage({type: 'typing'}, 'default');
    ffMenu.say(`{{vars.random}}`);
    ffMenu.addAction('second');

    ffMenu.before('second', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'fun_facts');
        convo.setVar('count', convo.vars.count + 1);
        if (convo.vars.count > 2) {
            convo.setVar('random', funArr[3]);
            await convo.gotoThread('third');
        } else if (convo.vars.count === 1) {
            convo.setVar('random', funArr[1]);
        } else if (convo.vars.count === 2) {
            convo.setVar('random', funArr[2]);
        }
        return new Promise(resolve => {
        setTimeout(resolve, 1400);
        })
    });
    ffMenu.addMessage(`{{vars.random}} count: {{vars.count}}`, 'second');
    ffMenu.addAction('second','second');

    ffMenu.before('third', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'fun_facts');
        return new Promise(resolve => {
            setTimeout(resolve, 1400);
        })
    });

    ffMenu.addMessage(`{{vars.random}}`,'third');
    ffMenu.addQuestion('What do you think', async(response, convo, bot) => {
        await bot.say(`You said ${response}`);
        await convo.gotoThread('fourth');
    }, 'think', 'third');

    ffMenu.before('fourth', async(convo, bot) => {
        await bot.say('BEFORE FOURTH!!!');
    });
    ffMenu.addMessage('this is the fourth thread', 'fourth');
    ffMenu.addQuestion('Will this work?', [], 'work', 'fourth');

    ffMenu.onChange('work', async(response, convo, bot) => {
        await convo.gotoThread('fifth');
    });

    ffMenu.before('fifth', async(convo, bot) => {
        await bot.say('BEFORE FIFTH!!!');
    });
    ffMenu.addMessage('this is the fifth thread','fifth');

    // ffMenu.addQuestion('Want to hear more fun facts?', [
    //     {
    //         pattern: 'cool',
    //         handler: async function(answer, convo, bot) {
    //             console.log('YES HANDLER');
    //             console.log(convo);
    //             await bot.say('Thanks!');
    //             await convo.gotoThread('second');
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
    // ], {key: 'answer'}, 'third');

    // fun_factsMenu.before('third', async(convo, bot) => {
        
    //     await bot.say('before third!');
    //     return new Promise(resolve => {
    //         setTimeout(resolve, 2000);
    //     }).catch(err => console.log(err))
    // });

    

    

    // fun_factsMenu.say(`I've lived in four different countries`);
    // fun_factsMenu.addAction('second')

    // fun_factsMenu.before('second', async(convo, bot) => {
    //     await bot.say({type: 'typing'}, 'fun_facts');
    //     return new Promise(resolve => {
    //         setTimeout(resolve, 1000);
    //     }).catch(err => console.log(err))
    // });

    // fun_factsMenu.addMessage(`Ask me more or say 'main' to go back to the main menu`, 'second')
    //can add
};