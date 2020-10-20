const { BotkitConversation } = require("botkit");
const masterArrayFunc = require('./thread_bank/master');
const masterArray = masterArrayFunc();

module.exports = function(controller) {

    let mainMenu = new BotkitConversation('main_thread', controller);
    const mainThread = masterArray[0]['script'][1]['script'][0];
    const helpText = mainThread['text'][0];

    controller.addDialog(mainMenu);

    async function typingIndicator(bot) {
        setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread');
        }, 1000)
    }

    mainMenu.before('default', async(convo, bot) => {
        // await bot.say('BEFORE DEFAULT!');
        // typingIndicator(bot);
        // setTimeout(async() => {
            await bot.say({type: 'typing'}, 'main_thread');
        // }, 1000)
        return new Promise(resolve => {
            setTimeout(resolve, 800);
        }).catch(err => console.log(err))
    });

    mainMenu.ask(helpText, [
        {
            pattern: 'help',
            handler: async function(answer, convo, bot) {
                console.log('YES HANDLER');
                // console.log(convo);
                return await convo.gotoThread('main_thread_qr');
            }
        },
        {
            pattern: 'no',
            handler: async function(answer, convo, bot) { 
                console.log(' NO HANDLER');
                await convo.gotoThread('bar');
            }
        },
        {
            default: true,
            handler: async (answer, convo, bot) => {
                console.log('FALLBACK HANDLER');
                await convo.repeat();
                // do nothing
            }
        }
    ], {key: 'answer'});

    mainMenu.addMessage({
        text: 'Choose from below to learn more about me:',
        quick_replies: [
                    {
                        title: 'About',
                        payload: 'about',
                    },
                    {
                        title: 'Education',
                        payload: 'education',
                    },
                    {
                        title: 'Experience',
                        payload: 'experience',
                    },
                    {
                        title: 'Fun Facts',
                        payload: 'fun_facts',
                    },
                    {
                        title: 'Tech Stack',
                        payload: 'tech_stack',
                    },
                    {
                        title: 'Contact',
                        payload: 'contact',
                    }
                ]
    }, 'main_thread_qr')
    mainMenu.addMessage('NOOOOOO', 'bar');
}