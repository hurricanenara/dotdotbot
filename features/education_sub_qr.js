const { BotkitConversation } = require('botkit');
const masterArrayFunc = require('./thread_bank/master');
const QRFunc = require('./thread_bank/quick_replies');

const eduQR = QRFunc('edu');

module.exports = function(controller) {

    let eduSubQR = new BotkitConversation('education_sub_qr', controller);

    controller.addDialog(eduSubQR);

    async function typingIndicator(bot) {
        setTimeout(async() => {
            await bot.say({type: 'typing'}, 'education_sub_qr');
        }, 1000)
    }

    eduSubQR.before('default', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'main_thread');
        return new Promise(resolve => {
            setTimeout(resolve, 800);
        }).catch(err => console.log(err))
    });

    // console.log(controller, "THIS IS CONTROLLER");

    eduSubQR.ask({
        text: 'Ask me any of the below questions!',
        quick_replies: async(line, vars) => {
            return eduQR
        }}, [], 'choice');

    eduSubQR.after(async(results, bot) => {
        await bot.say(`you said ${results.choice}`);
        console.log(results);
        if (results.choice !== 'back') {
            await bot.beginDialog(results.choice)
        } else {
            await bot.beginDialog('main_thread_qr')
        }
    });

    // whatisIE thread/convo
    let whatisIE = new BotkitConversation('whatisIE', controller);

    controller.addDialog(whatisIE);

    whatisIE.before('default', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'whatisIE');
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        }).catch(err => console.log(err))
    });

    whatisIE.addMessage(`Industrial engineering is an engineering profession that is concerned with the optimization of complex processes, systems, or organizations by developing, improving and implementing integrated systems of people, money, knowledge, information, equipment, energy and materials. (Wiki)`)
    whatisIE.addAction('second')
    whatisIE.before('second', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'whatisIE');
        return new Promise(resolve => {
            setTimeout(resolve, 3000);
        }).catch(err => console.log(err))
    });
    // whatisIE.addMessage(`I worked as an analyst (09/2015 - 09/2019), monitoring the oil and shipping markets, analyzing cargo and ship movement data using advanced Excel, macros, and VBA`, 'second');
    whatisIE.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'whatisIE');
        await bot.beginDialog('education_sub_qr');
    })

    // academic_goals thread/convo
    let academic_goals = new BotkitConversation('academic_goals', controller);

    controller.addDialog(academic_goals);

    academic_goals.before('default', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'academic_goals');
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        }).catch(err => console.log(err))
    });

    academic_goals.addMessage(`First, I want to learn deep and broad knowledge in Software Engieering and gain practical skills.`)
    academic_goals.addAction('second')
    academic_goals.before('second', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'academic_goals');
        return new Promise(resolve => {
            setTimeout(resolve, 3000);
        }).catch(err => console.log(err))
    });
    academic_goals.addMessage(`Then I untimately want to furtuer my education in the STEM field, specifically in Computer Science! :)`, 'second');
    academic_goals.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'academic_goals');
        await bot.beginDialog('education_sub_qr');
    });
}