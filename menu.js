var exports = module.exports = {main, info, more};

var builder = require('botbuilder');

function main (session) {
    var msg = new builder.Message(session);
    msg.attachments([
        new builder.HeroCard(session)
        .title("Need something?")
        .subtitle("Press a button or text me something interesting.")
        .buttons([
            builder.CardAction.imBack(session, "I want to buy tickets.", "Tickets"),
            builder.CardAction.imBack(session, "What speakers will be at the event?", "Speakers"),
            builder.CardAction.imBack(session, "How can I be a sponsor?", "Be a sponsor"),
            builder.CardAction.imBack(session, "Can I see the agenda?", "Agenda"),
            builder.CardAction.imBack(session, "I want to know more.", "Info"),
        ])
    ]);
    session.send(msg).endDialog();
}


function info (session) {
    var msg = new builder.Message(session);
    msg.attachments([
        new builder.HeroCard(session)
        .title("What do you want to know?")
        .buttons([
            builder.CardAction.imBack(session, "What is this event about?", "Conference"),
            builder.CardAction.imBack(session, "What is the futuristic party?", "Party"),
            builder.CardAction.imBack(session, "Who will be at the Expo?", "Expo"),
            builder.CardAction.imBack(session, "Who is on the team?", "Crew"),
            builder.CardAction.imBack(session, "Who are your partners?", "Partners"),
            builder.CardAction.imBack(session, "Anything else I need to know?", "More...")
        ])
    ]);
    session.send(msg).endDialog();
}


function more (session) {
    var msg = new builder.Message(session);
    msg.attachments([
        new builder.HeroCard(session)
        .title("What do you want to know?")
        .buttons([
            builder.CardAction.imBack(session, "What topics are you discussing?", "Topics"),
            builder.CardAction.imBack(session, "When is the event happening?", "When"),
            builder.CardAction.imBack(session, "Where is the event happening?", "Venue"),
            builder.CardAction.imBack(session, "What does D-Tech mean?", "Name meaning"),
            builder.CardAction.imBack(session, "How can I contact a human?", "Contact a human"),
            builder.CardAction.imBack(session, "What is your website?", "Website")
        ])
    ]);
    session.send(msg).endDialog();
}
