require('dotenv').config()

var show = require('./show');
var menu = require('./menu');
var payment = require('./payment');

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");

var cancel = /^nevermind$|^cancel$|^stop$|^stahp$|^cancel.*order/i
var help_msg = "Reply 'menu' to view the main menu, 'cancel' to stop whatever you're doing, '\\start' to restart everything. To report bugs or mock about bugs contact https://www.facebook.com/oksana.tkach.ua."

var server = restify.createServer();
console.log(server.url);
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
console.log(server.url);
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

server.post('/api/messages', connector.listen());

var tableName = 'botdata';
var storageName = "dtech8733";
var storageKey = "hMLxPkGIbnJldqElpbNkN4fv1mQcri0neJz4gmvSOBq5+m14kBSYGfFYDFOQ8q0UcSE4gAW9OzWH15yZO2iJwA==";

var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, storageName, storageKey);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';
const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

var recognizer = new builder.LuisRecognizer(LuisModelUrl);

var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);
bot.recognizer(recognizer);

var intents = new builder.IntentDialog({ recognizers: [recognizer], intentThreshold: 0.5 })
// INFO
.matches('website', (session) => {
    session.send('Here\'s our website: http://d-tech.space');
})
//.matches('vip_when', (session) => {
//    session.send('The VIP dinner will happen at 7 pm on March 16.');
//})
.matches('conf_when', (session) => {
    session.send('The conference will happen on March 17.');
})
.matches('party_when', (session) => {
    session.send('Our futuristic party will begin right after the conference on March 17.');
})
.matches('team_info', show.team)

.matches('ticket_info', (session) => {
    session.beginDialog('ticketInfo');
})
.matches('conf_info', (session) => {
    session.send('D-Tech Space is a festival of futuristic ideas! It\'s a two-day international event that aims to gather the most forward-thinking individuals, entrepreneurs, industry executives, futurists, visionaries, evangelists, leaders, investors, and just tech fans to ignite creativity and inspire action.');
})
.matches('speakers_info', show.speakers)

.matches('party_info', (session) => {
    session.send('D-Tech is not just dull networking, afterwards there will be a legendary futuristic party complete with a laser show and electronic music. Robots don\'t dance though, so I\'m not going.');
})
.matches('partners_who', show.partners)

.matches('expo_who', (session) => {
    session.send('Anything worth having is worth waiting for. Expo participants will be announced shortly.');
})
.matches('be_sponsor', [
    (session) => {
        session.send('My creators will appreciate your support. See sponsorship opportunities here: http://d-tech.space/sponsor/');
        builder.Prompts.choice(session, "Or... You could send us some crypto.", "Sure|LOL no", { listStyle: builder.ListStyle.button, maxRetries:0 });
    },
    (session, results) => {
        if (results.resumed > 0) {
            session.send("Cancelling selection.")
            session.send("What did you say?").endDialog();  
        }
        else if (results.response.entity == 'Sure') {
            session.beginDialog('sponsorCrypto')
        }
        else if (results.response.entity == 'LOL no') {
            session.send('Well OK then :(');
        }
}])
.matches('agenda', (session) => {
    session.send('Have patience, human. The agenda is coming up.');
})
.matches('name_meaning', (session) => {
    session.send("D-Tech Space stands for 'disruptive technologies space'.");
})
.matches('human_contact', (session) => {
    session.send('To talk to a real person, drop a line at info@d-tech.space.');
})
.matches('topics', show.topics)

.matches('venue', (session) => {

    var msg = new builder.Message(session)
        .addAttachment({
            contentType: 'text/html',
            contentUrl: 'http://www.fest.lviv.ua/en/projects/festrepublic.club/',
            name: "D-Tech Space will take place at !Fest Republic in Lviv, Ukraine."
        });
    session.send(msg);
    session.beginDialog("sendLocation");
})

// PAYMENT
.matches('buy_ticket', (session) => {
    session.beginDialog('buyTicket');
})
.matches('rate', (session) => {
    session.beginDialog('currentRate');
})

// FUN
.matches('cyr', (session) => {
    session.send('Привіт! Наразі не говорю українською :(');
    session.beginDialog('menu');
})
.matches('greeting', (session) => {
    session.beginDialog('menu');
})
.matches('confused', (session) => {
    session.send('What don\'t you understand?');
})
.matches('crypto_invest', (session) => {
    session.send('HODL');
})
.matches('who_are_you', (session) => {
    session.send('I am but a Turing machine. No need to be afraid. Measly human.');
})
.matches('tell_more', (session) => {
    session.send('Go google it.');
})
.matches('insult', (session) => {
    session.send('Well I am sorry you feel that way.');
})
.matches('poor', (session) => {
    session.send('You can always volunteer or contact us to get a deal.');
})
.matches('gender', (session) => {
    session.send('Um, did you just assume my gender?');
})
.matches('future_what', (session) => {
    session.send('The future is decentralied. Duh.');
})
.onDefault((session) => {
    session.send('I don\'t understand you, human. Please employ logic.');
});


bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, 'Greeting');
            }
        });
    }
});


bot.dialog('/', intents);


// MENU
bot.dialog('Greeting', [
    function (session) {
        session.endConversation('Welcome to the future.');
    }
])
.triggerAction({
    matches: /\\start|start/
});

bot.dialog('Help', 
    function (session) {
        session.send(help_msg).endDialog();
    }
)
.triggerAction({
    matches: /^help$/i
});


bot.dialog('menu', menu.main)
.triggerAction({
    matches: /^menu$/i
});

bot.dialog('info', menu.info)
.triggerAction({
    matches: /^I want to know more.$/i
});

bot.dialog('infoMore', menu.more)
.triggerAction({
    matches: /^Anything else I need to know\?$/i
});


// TICKETS
bot.dialog('buyTicket', payment.buy)
.cancelAction('cancelAction', 'Ok, cancelling.', {
    matches: cancel
});

bot.dialog('ticketInfo', payment.info);

bot.dialog('buyCrypto', payment.crypto);

bot.dialog('parseCrypto', payment.parse)
.cancelAction('cancelAction', 'Ok, cancelling.', {
    matches: cancel
});

bot.beginDialogAction('actionHowMany', 'HowMany');

bot.dialog('HowMany', payment.howmany)
.cancelAction('cancelAction', 'Ok, cancelling.', {
    matches: cancel
});

bot.dialog('addressTickets', payment.addressTickets)
.cancelAction('cancelAction', 'Ok, cancelling.', {
    matches: cancel
});

bot.dialog('currentRate', payment.rate)
.cancelAction('cancelAction', 'Ok, cancelling.', {
    matches: cancel
});

bot.dialog('sponsorCrypto', payment.addressSponsor)
.cancelAction('cancelAction', 'Ok, cancelling.', {
    matches: cancel
});


// MISC
bot.dialog('sendLocation', function (session) {
    var msg = new builder.Message(session)
        .addAttachment({
            contentType: 'image/jpeg', contentUrl: 'http://d-tech.space/wp-content/uploads/2017/09/DSC_8521.jpg'});
    session.send(msg).endDialog();
});
