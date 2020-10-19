const { BotkitConversation } = require('botkit');

module.exports = function(controller) {
    const DIALOG_NAME = 'convo_main';
    const convo_main = new BotkitConversation(DIALOG_NAME, controller);

    

}