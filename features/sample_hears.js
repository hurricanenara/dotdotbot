/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const masterArrayFunc = require('./thread_bank/master');
const masterArray = masterArrayFunc();

module.exports = function(controller) {

    // use a function to match a condition in the message
    controller.hears(async (message) => message.text && message.text.toLowerCase() === 'foo', ['message'], async (bot, message) => {
        await bot.reply(message, 'I heard "foo" via a function test');
    });

    // use a regular expression to match the text of the message
    controller.hears(new RegExp(/^\d+$/), ['message','direct_message'], async function(bot, message) {
        await bot.reply(message,{ text: 'I heard a number using a regular expression.' });
    });

    // match any one of set of mixed patterns like a string, a regular expression
    controller.hears(['allcaps', new RegExp(/^[A-Z\s]+$/)], ['message','direct_message'], async function(bot, message) {
        await bot.reply(message,{ text: 'I HEARD ALL CAPS!' });
    });

    controller.hears('typing1','message', async function(bot, message) {
        await bot.reply(message,{
        text: 'This message used the automatic typing delay',
        typing: true,
        });
    });

    controller.hears('typing2','message', async function(bot, message) {
        await bot.reply(message,{
        text: 'This message specified a 4000ms typing delay',
        typingDelay: 4000,
        });
    });
    
    controller.hears(['hello', 'hi', 'yo'], ['message'], async (bot, message) => {
        const greetings = masterArray[0]['script'][0]['script'][0]['text'];
        console.log(greetings);
        const rand = Math.floor(Math.random() * greetings.length)
        await bot.reply(message, greetings[rand]);
        await bot.beginDialog('main_thread');
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    });

    controller.hears(['main', 'main menu', 'beginning'], ['message'], async (bot, message) => {
        await bot.beginDialog('main_thread_qr');
        return new Promise(resolve => {
            setTimeout(resolve, 600);
        });
    });

    controller.hears(["help"], ['message'], async (bot, message) => {
        const main_thread = masterArray[1]['script']['collect']['options'];
    });


    // controller.hears(async(message) => {
    //     let messageArr = message.split(' ');
        
    // }, ['message'], async(bot, message) => {

    // });

    // controller.hears('boo!', ['message'], async (bot, message) => await globalThis.alert('Happy Halloween!'));
    controller.hears(['school', 'education', 'major'],'message', async (bot, message) => {
        await bot.reply(message, 'you want to learn about my education history.')

    });

    controller.hears(new RegExp(/(open|interview)/),'message', async (bot, message) => {
        await bot.reply(message, `Yes! I'm looking to join a team of ambitious individuals where I can contribute and learn.`);
        
    });
}