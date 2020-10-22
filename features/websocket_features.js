/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const resume = require('./thread_bank/resume.json');

module.exports = function(controller) {

    const { name } = resume.about;

    if (controller.adapter.name === 'Web Adapter') {

        controller.on('hello', async(bot, message) => {
            await bot.reply(message, `Welcome to my channel! My name is ${name}. Greet me! `)
        });

        controller.on('welcome_back', async(bot, message) => {
            await bot.reply(message, `welcome back to ${name}'s Channel!`)
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