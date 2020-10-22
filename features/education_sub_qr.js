const { BotkitConversation } = require('botkit');
const startTyping = require('./thread_bank/typingIndicator');
const eduQR = require('./thread_bank/quick_replies')('edu');

module.exports = function(controller) {

    let eduSubQR = new BotkitConversation('education_sub_qr', controller);

    controller.addDialog(eduSubQR);

    startTyping(eduSubQR);

    eduSubQR.addQuestion({
        text: 'Ask me any of the below follow-up questions!',
        quick_replies: async(line, vars) => {
            return eduQR
        }}, [], 'choice', 'default');

    eduSubQR.before('second', async(convo, bot) => {
            await bot.say({type: 'typing'});
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    })

    eduSubQR.addAction('second');

    // eduSubQR.addQuestion('Or you can ask whatever you want', [
    //     {
    //         pattern: 'help',
    //         handler: async function(res, convo, bot) {
    //             await bot.say(`You said help`);
    //             return await bot.beginDialog('main_thread_qr');
    //         }
    //     },
    //     {
    //         pattern: 'work' || 'history',
    //         handler: async function(res, convo, bot) {
    //             await bot.say(`You said work history`);
    //             return await bot.beginDialog('experience');
    //         }
    //     },
    //     // {
    //     //     pattern: 'school' || 'education' || 'major',
    //     //     handler: async function(res, convo, bot) {
    //     //         await bot.say(`You want to learn about my academic background`);
    //     //         return await bot.beginDialog('education');
    //     //     }
    //     // },
    //     {
    //         default: true,
    //         handler: async (res, convo, bot) => {
    //             await convo.repeat();
    //         }
    //     }
    // ], 'more_qs', 'second');

    eduSubQR.after(async(results, bot) => {
        await bot.say(`You said ${results.choice}`);
        if (results.choice !== 'back') {
            await bot.beginDialog(results.choice)
        } else {
            await bot.beginDialog('main_thread_repeat')
        }
    });

    // whatisIE thread/convo
    let whatisIE = new BotkitConversation('whatisIE', controller);

    controller.addDialog(whatisIE);

    startTyping(whatisIE);

    whatisIE.addMessage(`Industrial engineering is an engineering profession that is concerned with the optimization of complex processes, systems, or organizations by developing, improving and implementing integrated systems of people, money, knowledge, information, equipment, energy and materials. (Wiki)`)
    whatisIE.addAction('second')

    startTyping(whatisIE, 'second', 1500);

    // whatisIE.addMessage(``, 'second');
    whatisIE.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'whatisIE');
        await bot.beginDialog('education_sub_qr');
    })

    // academic_goals thread/convo
    let academicGoals = new BotkitConversation('academic_goals', controller);

    controller.addDialog(academicGoals);

    startTyping(academicGoals);

    academicGoals.addMessage(`First, I want to learn deep and broad knowledge in Software Engieering and gain practical skills.`)
    academicGoals.addAction('second')

    startTyping(academicGoals, 'second', 1500);

    academicGoals.addMessage(`Then I untimately want to furtuer my education in the STEM field, specifically in Computer Science! :)`, 'second');
    academicGoals.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'academic_goals');
        await bot.beginDialog('education_sub_qr');
    });
}