const { BotkitConversation } = require('botkit');
const masterArrayFunc = require('./thread_bank/master');
const QRFunc = require('./thread_bank/quick_replies');

const projectsQR = QRFunc('projects');

module.exports = function(controller) {
    let first = "Ask me any of the below questions!";
    let second = "Ask me more:";
    let quest = first;

    let projectsSubQR = new BotkitConversation('projects_sub_qr', controller);

    controller.addDialog(projectsSubQR);

    async function typingIndicator(bot) {
        setTimeout(async() => {
            await bot.say({type: 'typing'}, 'projects_sub_qr');
        }, 1000)
    }

    projectsSubQR.before('default', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'main_thread');
        return new Promise(resolve => {
            setTimeout(resolve, 800);
        }).catch(err => console.log(err))
    });

    // console.log(controller, "THIS IS CONTROLLER");

    projectsSubQR.ask({
        text: quest,
        quick_replies: async(line, vars) => {
            return projectsQR;
        }}, [], 'choice');

    projectsSubQR.after(async(results, bot) => {
        await bot.say(`You said ${results.choice}`);
        console.log(results);
        if (results.choice !== 'back') {
            await bot.beginDialog(results.choice)
        } else {
            await bot.beginDialog('main_thread_qr')
        }
    });

    // quiche thread/convo
    let quiche = new BotkitConversation('quiche', controller);

    controller.addDialog(quiche);

    quiche.before('default', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'quiche');
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        }).catch(err => console.log(err))
    });

    quiche.addMessage(`Quiche is a fullstack project, a clone of Robinhood (online securities trading site). I used Ruby/Rails, PostgreSQL JavaScript/React/Redux.`)
    quiche.addAction('second')
    quiche.before('second', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'quiche');
        return new Promise(resolve => {
            setTimeout(resolve, 3000);
        }).catch(err => console.log(err))
    });
    quiche.addMessage(`You can check it out at <https://quichelite.herokuapp.com/#/>`, 'second');
    quiche.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'quiche');
        await bot.beginDialog('projects_sub_qr');
    })

    // oil thread/convo
    let oil = new BotkitConversation('oil', controller);

    controller.addDialog(oil);

    oil.before('default', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'oil');
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        }).catch(err => console.log(err))
    });

    oil.addMessage(``)
    oil.addAction('second')
    oil.before('second', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'oil');
        return new Promise(resolve => {
            setTimeout(resolve, 3000);
        }).catch(err => console.log(err))
    });
    oil.addMessage(``, 'second');
    oil.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'oil');
        await bot.beginDialog('projects_sub_qr');
    });

    // rps thread/convo
    let rps = new BotkitConversation('rps', controller);

    controller.addDialog(rps);

    rps.before('default', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'rps');
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        }).catch(err => console.log(err))
    });

    rps.addMessage(``)
    rps.addAction('second')
    rps.before('second', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'rps');
        return new Promise(resolve => {
            setTimeout(resolve, 3000);
        }).catch(err => console.log(err))
    });
    rps.addMessage(``, 'second');
    rps.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'rps');
        await bot.beginDialog('projects_sub_qr');
    });
}