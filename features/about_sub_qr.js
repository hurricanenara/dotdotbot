const { BotkitConversation } = require('botkit');
const masterArrayFunc = require('./thread_bank/master');
const QRFunc = require('./thread_bank/quick_replies');

const aboutQR = QRFunc('about');

module.exports = function(controller) {
    let first = "Ask me any of the below questions!";
    let second = "Ask me more:";
    let quest = first;

    let aboutSubQR = new BotkitConversation('about_sub_qr', controller);

    controller.addDialog(aboutSubQR);

    async function typingIndicator(bot) {
        setTimeout(async() => {
            await bot.say({type: 'typing'}, 'about_sub_qr');
        }, 1000)
    }

    aboutSubQR.before('default', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'main_thread');
        return new Promise(resolve => {
            setTimeout(resolve, 800);
        }).catch(err => console.log(err))
    });

    // console.log(controller, "THIS IS CONTROLLER");

    aboutSubQR.ask({
        text: quest,
        quick_replies: async(line, vars) => {
            return aboutQR;
        }}, [], 'choice');

    aboutSubQR.after(async(results, bot) => {
        await bot.say(`You said ${results.choice}`);
        console.log(results);
        if (results.choice !== 'back') {
            await bot.beginDialog(results.choice)
        } else {
            await bot.beginDialog('main_thread_qr')
        }
    });

    // first_line thread/convo
    let first_line = new BotkitConversation('first_line', controller);

    controller.addDialog(first_line);

    first_line.before('default', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'first_line');
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        }).catch(err => console.log(err))
    });

    first_line.addMessage(`It was in 6th grade when I wrote my first line! I immediately shot to the moon as I watched my code render on the browser.`)
    first_line.addAction('second')
    first_line.before('second', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'first_line');
        return new Promise(resolve => {
            setTimeout(resolve, 3000);
        }).catch(err => console.log(err))
    });
    // first_line.addMessage(``, 'second');
    first_line.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'first_line');
        await bot.beginDialog('about_sub_qr');
    })

    // fave_game thread/convo
    let fave_game = new BotkitConversation('fave_game', controller);

    controller.addDialog(fave_game);

    fave_game.before('default', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'fave_game');
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        }).catch(err => console.log(err))
    });

    fave_game.addMessage(`I grew up playing a variety of online role playing/strategy games like Age of Empires, Starcraft, Pokemon etc. I especially love AOE.`)
    fave_game.addAction('second')
    fave_game.before('second', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'fave_game');
        return new Promise(resolve => {
            setTimeout(resolve, 3000);
        }).catch(err => console.log(err))
    });
    fave_game.addMessage(`I recently picked up Minecraft, it's pretty cool.`, 'second');
    fave_game.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'fave_game');
        await bot.beginDialog('about_sub_qr');
    });

    // hobbies thread/convo
    let hobbies = new BotkitConversation('hobbies', controller);

    controller.addDialog(hobbies);

    hobbies.before('default', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'hobbies');
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        }).catch(err => console.log(err))
    });

    hobbies.addMessage(`Thinking about becomming a billionaire.`)
    hobbies.addAction('second')
    hobbies.before('second', async(convo, bot) => {
        await bot.say({type: 'typing'}, 'hobbies');
        return new Promise(resolve => {
            setTimeout(resolve, 3000);
        }).catch(err => console.log(err))
    });
    hobbies.addMessage(`In all seriousness, apart from programming and learning new things, I like driving, helping others with their code, and exploring NYC.`, 'second');
    hobbies.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'hobbies');
        await bot.beginDialog('about_sub_qr');
    });
}