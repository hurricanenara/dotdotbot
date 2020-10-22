const { BotkitConversation } = require('botkit');
const startTyping = require('./thread_bank/typingIndicator');
const aboutQR = require('./thread_bank/quick_replies')('about'); // currying

module.exports = function(controller) {
    let first = "Ask me any of the below questions!";
    let second = "Ask me more:";
    let quest = first;

    let aboutSubQR = new BotkitConversation('about_sub_qr', controller);

    controller.addDialog(aboutSubQR);

    startTyping(aboutSubQR);

    aboutSubQR.ask({
        text: quest,
        quick_replies: async(line, vars) => {
            return aboutQR;
        }}, [], 'choice');

    aboutSubQR.after(async(results, bot) => {
        await bot.say(`You said ${results.choice}`);
        if (results.choice !== 'back') {
            await bot.beginDialog(results.choice)
        } else {
            await bot.beginDialog('main_thread_qr')
        }
    });

    // first_line thread/convo
    let first_line = new BotkitConversation('first_line', controller);

    controller.addDialog(first_line);

    startTyping(first_line);

    first_line.addMessage(`It was in 6th grade when I wrote my first line! I immediately shot to the moon as I watched my code render on the browser.`)
    first_line.addAction('second')

    startTyping(first_line, 'second', 1500);

    // first_line.addMessage(``, 'second');

    first_line.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'first_line');
        await bot.beginDialog('about_sub_qr');
    })

    // fave_game thread/convo
    let fave_game = new BotkitConversation('fave_game', controller);

    controller.addDialog(fave_game);

    startTyping(fave_game);

    fave_game.addMessage(`I grew up playing a variety of online role playing/strategy games like Age of Empires, Starcraft, Pokemon etc. I especially love AOE.`)
    fave_game.addAction('second')

    startTyping(fave_game, 'second', 1500);

    fave_game.addMessage(`I recently picked up Minecraft, it's pretty cool.`, 'second');
    fave_game.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'fave_game');
        await bot.beginDialog('about_sub_qr');
    });

    // hobbies thread/convo
    let hobbies = new BotkitConversation('hobbies', controller);

    controller.addDialog(hobbies);

    startTyping(hobbies);

    hobbies.addMessage(`Thinking about becomming a billionaire.`)
    hobbies.addAction('second')
    
    startTyping(hobbies, 'second', 1500);

    hobbies.addMessage(`In all seriousness, apart from programming and learning new things, I like driving, helping others with their code, and exploring NYC.`, 'second');
    
    hobbies.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'hobbies');
        await bot.beginDialog('about_sub_qr');
    });
}