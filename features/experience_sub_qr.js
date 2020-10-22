const { BotkitConversation } = require('botkit');
const expQR = require('./thread_bank/quick_replies')('experience');
const resume = require('./thread_bank/resume.json');
const startTyping = require('./thread_bank/typingIndicator');

module.exports = function(controller) {

    let expSubQR = new BotkitConversation('experience_sub_qr', controller);

    controller.addDialog(expSubQR);

    startTyping(expSubQR);

    expSubQR.ask({
        text: 'Choose an experience from below to learn more:',
        quick_replies: async(line, vars) => {
            return expQR
        }}, [], 'choice');

    expSubQR.after(async(results, bot) => {
        await bot.say(`You said ${results.choice}`);
        if (results.choice !== 'back') {
            await bot.beginDialog(results.choice)
        } else {
            await bot.beginDialog('main_thread_repeat')
        }
    });

    // Scorpio thread/convo
    let scorpio = new BotkitConversation('scorpio', controller);

    controller.addDialog(scorpio);

    startTyping(scorpio);

    scorpio.addMessage('Largest product tanker company in the world, Scorpio owns both refined oil (clean) tankers and drybulk carriers (grains, metals, wood, etc).')
    scorpio.addAction('second')

    startTyping(scorpio, 'second', 1500);

    scorpio.addMessage(`I worked as an analyst (09/2015 - 09/2019), monitoring the oil and shipping markets, analyzing cargo and ship movement data using advanced Excel, macros, and VBA`, 'second');
    scorpio.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'scorpio');
        await bot.beginDialog('experience_sub_qr');
    })

    // SDSMT thread/convo
    let sdsmt = new BotkitConversation('sdsmt', controller);

    controller.addDialog(sdsmt);

    startTyping(sdsmt);

    sdsmt.addMessage('SDSM&T (South Dakota School of Mines & Techology) is an engineering school located in Rapid City, South Dakota')
    sdsmt.addAction('second')
    
    startTyping(sdsmt, 'second', 1500);

    sdsmt.addMessage(`As a student, I tutored other students 20hr/week (04/2013 - 05/2015) in Differential Equations, Calculus I & II, Probability & Statistics I & II, Biostatistics, and Statics.`, 'second');
    sdsmt.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'sdsmt');
        await bot.beginDialog('experience_sub_qr');
    });

    // BD thread/convo
    let bd = new BotkitConversation('bd', controller);

    controller.addDialog(bd);

    startTyping(bd);

    bd.addMessage('BD (Becton Dickinson) is a medical tech company where I wasn a Quality/EHS Intern (May 2015 - Aug 2015)')
    bd.addAction('second')

    startTyping(bd, 'second', 1500);

    // bd.before('second', async(convo, bot) => {
    //     await bot.say({type: 'typing'});
    //     return new Promise(resolve => {
    //         setTimeout(resolve, 1500);
    //     });
    // });

    bd.addMessage(`I managed and performed various statistical analysis on production performance. I also conducted the annual hearing conservation program to assure workers' health and safety (per OSHA guidelines).`, 'second');
    bd.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'bd');
        await bot.beginDialog('experience');
    });

    // Samsung thread/convo
    let samsung = new BotkitConversation('samsung', controller);

    controller.addDialog(samsung);

    startTyping(samsung);

    samsung.addMessage(`I was an IT Infrastructure Intern an Samsung (Jun 2010 - Jul 2010)`)
    samsung.addAction('second')

    startTyping(samsung, 'second', 1500);

    samsung.addMessage(`I contributed in research of their then mega project of attempt to expand Seoul, South Korea's T-Money transit card system into Chicago. I researched some of the top investors.`, 'second');
    samsung.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'samsung');
        await bot.beginDialog('experience_sub_qr');
    });

    // Hanwha thread/convo
    let hanwha = new BotkitConversation('hanwha', controller);

    controller.addDialog(hanwha);

    startTyping(hanwha);

    hanwha.addMessage(`I was a Human Factors Intern at Hanwha (Jun 2011 - Jul 2011)`)
    hanwha.addAction('second')
    startTyping(hanwha, 'second', 1500);

    hanwha.addMessage(`I researched and reviewed some of Hanwha's biggest ISO standards that are used to keep engieering and construction sites safe and organized.`, 'second');
    hanwha.after(async(results, bot) => {
        await bot.say({type: 'typing'}, 'hanwha');
        await bot.beginDialog('experience');
    });
}