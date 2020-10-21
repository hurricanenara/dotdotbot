
module.exports = function startTyping(convo, thread='default', time=800) {
    //able to piggy back tayping indicator with await, then right after, next message in quete will be fired.
    return convo.before(thread, async(convo, bot) => {
        await bot.say({type: 'typing'});
        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    });
}