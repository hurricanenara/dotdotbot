/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
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
    
}