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

    controller.hears([new RegExp(/([w|W]hat\'?s up\?*|^yo$|^yoo+|hi+|hello+|howdy\!*|hey+\!*|[H|h]ow are you\?*)/)], ['message'], async (bot, message) => {
        const greetings = masterArray[0]['script'][0]['script'][0]['text'];
        const rand = Math.floor(Math.random() * greetings.length)
        await bot.reply(message, greetings[rand]);
        await bot.beginDialog('main_thread');
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    });

    controller.hears([new RegExp(/(are you a (bot\?*|robot\?*)|are you (human\?*|alive\?*))/)], ['message'], async (bot, message) => {
        await bot.reply(message, `Why don't you take a wild guess or say hi to find out!`);
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

    controller.hears(new RegExp(/(^are you open to work\?$)/),'message', async (bot, message) => {
        await bot.reply(message, `Yes! I'm looking to join a team of ambitious individuals where I can contribute and learn.`);
    });
    
    controller.hears(new RegExp(/(name\?$)/),'message', async (bot, message) => {
        await bot.reply(message, `My name is Nara.`);
        await bot.beginDialog('main_thread');
    });
    
    controller.hears(new RegExp(/(speak\?+$)/),'message', async (bot, message) => {
        await bot.reply(message, `I'm fluent in Korean and English.`);
        await bot.beginDialog('main_thread');
    });
    controller.hears(new RegExp(/(from\?+$)/),'message', async (bot, message) => {
        await bot.reply(message, `I grew up in Korea, England and the US.`);
        await bot.beginDialog('main_thread');
    });
}