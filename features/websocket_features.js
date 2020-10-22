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
            await bot.reply(message, `Welcome back to ${name}'s Channel! Say hi!`)
        });
    }

}