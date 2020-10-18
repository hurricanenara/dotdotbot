/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const { BotkitConversation } = require("botkit");
module.exports = function(controller) {

    if (controller.adapter.name === 'Web Adapter') {

        console.log('Loading sample web features...');

        controller.on('hello', async(bot, message) => {
            await bot.reply(message, "your first visit, hello!")
        });

        controller.on('welcome_back', async(bot, message) => {
            await bot.reply(message, "welcome back!")
        });

        controller.hears(new RegExp('quick'), 'message', async (bot, message) => {
            await bot.reply(message,{
                text: 'Here are some quick replies',
                quick_replies: [
                    {
                        title: 'Foo',
                        payload: 'foo',
                    },
                    {
                        title: 'Bar',
                        payload: 'bar',
                    }
                ]
            });
        });


    }

}