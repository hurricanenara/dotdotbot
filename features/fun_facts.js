const { BotkitConversation } = require("botkit");

const funArr = require('./thread_bank/quick_replies')('fun'); //currying

module.exports = function(controller) {
    
    let ffMenu = new BotkitConversation('fun_facts', controller);
    // const funArr = funFunc('fun');
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
    ffMenu.addMessage(`{{vars.random}}`, 'second');
    ffMenu.addAction('second','second');

    ffMenu.before('third', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'fun_facts');
        return new Promise(resolve => {
            setTimeout(resolve, 1400);
        })
    });

    ffMenu.addMessage(`{{vars.random}}`,'third');
    ffMenu.addMessage({type: 'typing'}, 'third');

    ffMenu.addQuestion(`What else would you like to know?`, [
        {
            pattern: new RegExp(/(help?|hint|hmm|idk)/),
            handler: async function(res, convo, bot) {
                await bot.say(`If you need help...`);
                return await bot.beginDialog('experience_sub_qr');
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
            pattern: new RegExp(/(languages?|tech|stack)/),
            handler: async function(res, convo, bot) {
                await bot.say(`You want to learn about my tech stack`);
                return await bot.beginDialog('techStack');
            }
        },
        {
            pattern: new RegExp(/(facts|^tell me fun facts about yourself$)/),
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
            pattern: new RegExp(/(^tell me about yourself$|^tell me$)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Okay!`);
                return await bot.beginDialog('about');
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
            pattern: new RegExp(/(who)/),
            handler: async function(res, convo, bot) {
                // await bot.say(`Gotcha.`);
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
            pattern: new RegExp(/(resume)/),
            handler: async function(res, convo, bot) {
                await bot.say(`Here's my resume...<br> <a href="https://drive.google.com/file/d/1_2cHoazI1LB68rk5k40v-GGUEUKqY-t0/view target="_blank" >here</a> you go!`);
                return await bot.beginDialog('main_thread_repeat');
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
    ], 'res', 'third');


    // ffMenu.addQuestion('What do you think', async(response, convo, bot) => {
    //     await bot.say(`You said ${response}`);
    //     await convo.gotoThread('fourth');
    // }, 'think', 'third');

    // ffMenu.before('fourth', async(convo, bot) => {
    //     await bot.say('BEFORE FOURTH!!!');
    // });
    // ffMenu.addMessage('this is the fourth thread', 'fourth');
    // ffMenu.addQuestion('Will this work?', [], 'work', 'fourth');

    // ffMenu.onChange('work', async(response, convo, bot) => {
    //     await convo.gotoThread('fifth');
    // });

    // ffMenu.before('fifth', async(convo, bot) => {
    //     await bot.say('BEFORE FIFTH!!!');
    // });
    // ffMenu.addMessage('this is the fifth thread','fifth');
};