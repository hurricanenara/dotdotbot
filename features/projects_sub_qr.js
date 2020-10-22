const { BotkitConversation } = require('botkit');
const projectsQR = require('./thread_bank/quick_replies')('projects');
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {
    let first = "Ask me any of the below questions!";
    let second = "Ask me more:";
    let quest = first;

    let projectsSubQR = new BotkitConversation('projects_sub_qr', controller);

    controller.addDialog(projectsSubQR);

    startTyping(projectsSubQR);

    projectsSubQR.ask({
        text: quest,
        quick_replies: async(line, vars) => {
            return projectsQR;
        }}, [], 'choice');

    projectsSubQR.after(async(results, bot) => {
        await bot.say(`You said ${results.choice}`);
        if (results.choice !== 'back') {
            await bot.beginDialog(results.choice)
        } else if (results.choice === 'back') {
            await bot.beginDialog('main_thread_repeat')
        }
    });

    // quiche thread/convo
    let quiche = new BotkitConversation('quiche', controller);

    controller.addDialog(quiche);

    startTyping(quiche);

    quiche.addMessage(`Quiche is a fullstack project, a clone of Robinhood (online securities trading site). I used Ruby/Rails, PostgreSQL JavaScript/React/Redux.`)
    quiche.addAction('second')

    startTyping(quiche, 'second', 1500)

    quiche.addMessage(`You can check it out <a href=https://quichelite.herokuapp.com/#/>here</a>`, 'second');

    quiche.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'quiche');
        await bot.beginDialog('projects_sub_qr');
    })

    // oil thread/convo
    let oil = new BotkitConversation('oil', controller);

    controller.addDialog(oil);

    startTyping(oil);

    oil.addMessage(`Oil is a single-page data visualization and an interactive map create with JavaScript and d3.js.`)
    oil.addAction('second')

    startTyping(oil, 'second', 1500)

    oil.addMessage(`Check it out through this <a href=https://hurricanenara.github.io/oil/>link</a>`, 'second');

    oil.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'oil');
        await bot.beginDialog('projects_sub_qr');
    });

    // rps thread/convo
    let rps = new BotkitConversation('rps', controller);

    controller.addDialog(rps);

    startTyping(rps);

    rps.addMessage(`RPS is a real-time two-player rock paper scissors game created with MongoDB, Express, React, and Node (MERN) + Socket.io.`)
    rps.addAction('second')

    startTyping(rps, 'second', 1500)

    rps.addMessage(`Check it out here: <https://hurricanenara.github.io/oil/>`, 'second');
    rps.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'rps');
        await bot.beginDialog('projects');
    });
}