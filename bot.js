// // Copyright (c) Microsoft Corporation. All rights reserved.
// // Licensed under the MIT License.

const { ActivityHandler, MessageFactory } = require('botbuilder');

class JokeBot extends ActivityHandler {
    constructor() {
        super();

        this.jokes = [
            "Why did the tomato turn red? Because it saw the salad dressing!",
            "Why do programmers prefer dark mode? Because light attracts bugs!",
            "Why did the chicken go to the seance? To talk to the other side!",
            "Why don’t scientists trust atoms? Because they make up everything!",
            "What do you call a lazy kangaroo? A pouch potato!",
            "Why did the banana go to the doctor? Because it wasn't peeling well!",
            "Why did the cookie go to the doctor? Because it was feeling crummy!",
            "Why don't ants get sick? Because they have tiny ant-bodies!",
            "Why did the math book look so sad? Because it had too many problems.",
            "Why did the scarecrow win an award? Because he was outstanding in his field."
        ];

        let tellingJokes = false;
        let jokeIndex = 0;


        this.onMessage(async(context, next) => {
            const userMessage = context.activity.text;
            let botResponse = "";

            if (userMessage.toLowerCase().includes("tell me jokes")) {
                tellingJokes = true;
                await context.sendActivity(MessageFactory.text("Sure! Here's a joke:"));
                while (tellingJokes) {
                    jokeIndex = Math.floor(Math.random() * this.jokes.length);
                    botResponse = this.jokes[jokeIndex];
                    await context.sendActivity(MessageFactory.text(botResponse, botResponse));
                    await new Promise(resolve => setTimeout(resolve, 2000)); // wait for 2 seconds
                }
            } else if (userMessage.toLowerCase().includes("stop") && tellingJokes) {
                tellingJokes = false;
                botResponse = "Okay, no more jokes. Goodbye!";
                await context.sendActivity(MessageFactory.text(botResponse, botResponse));
            } else {
                botResponse = "Sorry, I don't understand. Can you please rephrase your question?";
                await context.sendActivity(MessageFactory.text(botResponse, botResponse));
            }

            await next();
        });


        this.onMembersAdded(async(context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'WELCOME TO Joke BOT I AM HERE TO MAKE YOU LAUGH, MAKE YOU SMILE, GROSS YOU OUT AND OCCASIONALLY SCARE THE CRAP OUT OF YOU. BUCKLE UP AND ENJOY THIS BOT 😅😉!!!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.JokeBot = JokeBot;