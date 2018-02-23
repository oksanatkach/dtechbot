var exports = module.exports = {speakers, topics, partners, team};

var builder = require('botbuilder');

function speakers (session) {
    session.send('The speakers are top professionals in innovative tech fields, evangelists for disruptive technologies, successful entrepreneurs; all unique and inspiring people.');
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel);
    msg.attachments([
        new builder.HeroCard(session)
            .title("Matt McKibbin")
            .subtitle("USA")
            .text("Dreamer, Decentralization Evangelist, Blockchain Entrepreneur")
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2018/01/RESIZED_25319806_10106012122779809_1718728267_o.jpg')])
            .buttons([
                builder.CardAction.openUrl(session, "https://www.facebook.com/matt.mckibbin1", "Facebook")
            ]),
        new builder.HeroCard(session)
            .title("Antonio Manno")
            .subtitle("Italy")
            .text("Mechanical engineer turned entrepreneur; co-founder of Exosphere")
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2018/01/RESIZED_3.jpg')])
            .buttons([
                builder.CardAction.openUrl(session, "https://www.facebook.com/antonio.manno3", "Facebook")
            ]),
        new builder.HeroCard(session)
            .title("Dominik Stroukal")
            .subtitle("Czech Republic")
            .text("Ph.D. in Economic Theories; currently researching cryptocurrencies")
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2018/01/RESIZED_title617021352.png')])
            .buttons([
                builder.CardAction.openUrl(session, "https://www.facebook.com/stroukal.cz", "Facebook")
            ]),
        new builder.HeroCard(session)
            .title("Andriy Sobol")
            .subtitle("Ukraine")
            .text("Distributed Systems Architect and blockchain expert")
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2018/01/RESIZED_sobol.jpg')])
            .buttons([
                builder.CardAction.openUrl(session, "https://www.facebook.com/andreysobol", "Facebook")
            ]),
        new builder.HeroCard(session)
            .title("Tristan Senycia")
            .subtitle("Australia")
            .text("Founder Partner at LeverPoint Advisory")
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2018/01/RESIZED_25394191_10160133443775179_891285218_n.jpg')])
            .buttons([
                builder.CardAction.openUrl(session, "https://www.facebook.com/tristan.senycia", "Facebook")
            ]),
        new builder.HeroCard(session)
            .title("Adam Dorfman")
            .subtitle("Canada")
            .text ("Decentralizing higher education in the CEE region")
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2018/01/RESIZED_19441729_958187874323782_4828284854178177647_o.jpg')])
            .buttons([
                builder.CardAction.openUrl(session, "https://www.facebook.com/DorfmanAdam", "Facebook")
            ])
    ])
    session.send(msg).endDialog();
}


function topics (session) {
    session.send('We pursue technologies and ideas that are shaping the information age and re-designing all spheres of human life.');
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel);
    msg.attachments([
        new builder.HeroCard(session)
            .title("Decentralization")
            .subtitle("Re-shaping the internet era"),
        new builder.HeroCard(session)
            .title("Blockchain")
            .subtitle("Re-inventing trust"),
        new builder.HeroCard(session)
            .title("Digital assets")
            .subtitle("Re-distributing wealth"),
        new builder.HeroCard(session)
            .title("Emerging technologies")
            .subtitle("Re-designing digital future"),
        new builder.HeroCard(session)
            .title("Smart Cities Entrepreneurship")
            .subtitle("Re-evaluating entrepreneurial spirit"),
        new builder.HeroCard(session)
            .title("Sharing economies")
            .subtitle("Re-creating consumption models"),
        new builder.HeroCard(session)
            .title("3-D Printing")
            .subtitle("Re-connecting consumers and designers"),
        new builder.HeroCard(session)
            .title("Transhumanism")
            .subtitle("Re-imagining human life"),
        new builder.HeroCard(session)
            .title("AR/VR")
            .subtitle("Re-making movies and re-telling stories")
        ]);
    session.send(msg).endDialog();
}


function partners (session) {
    session.send('You too can help us bring together creativity and technologies and build a community of people who design the future today.');
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel);
    msg.attachments([
        new builder.HeroCard(session)
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2017/09/Screenshot_3.png')])
            .buttons([
                builder.CardAction.openUrl(session, "decentranet.com", "DecentraNet")
            ]),
        new builder.HeroCard(session)
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2018/01/RESIZED_22491473_1862967087352027_6581603951149299581_n.png')])
            .buttons([
                builder.CardAction.openUrl(session, "https://www.facebook.com/dreamTIMlviv/", "TIM")
            ]),
        new builder.HeroCard(session)
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2018/01/RESIZED_logo-baf-footer.png')])
            .buttons([
                builder.CardAction.openUrl(session, "https://barterwille.org.ua/", "Barterwille")
            ]),
        new builder.HeroCard(session)
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2018/01/RESIZED_05-%E2%80%A2-Brand-%E2%80%A2-C-%E2%80%A2-Dark-%E2%80%A2-Academy-2-300x247.png')])
            .buttons([
                builder.CardAction.openUrl(session, "http://exosphe.re/", "Exosphere")
            ]),
        new builder.HeroCard(session)
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2018/01/RESIZED_logo-210x300.png')])
            .buttons([
                builder.CardAction.openUrl(session, "https://www.facebook.com/3dmania.print", "3D Mania")
            ]),
        new builder.HeroCard(session)
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2018/01/RESIZED_26648048_10160222311545179_1416244530_n.png')])
            .buttons([
                builder.CardAction.openUrl(session, "https://youteam.co.uk/", "YOUTEAM")
            ]),
        new builder.HeroCard(session)
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2018/01/RESIZED_26655584_10160222307495179_1362537636_o.png')])
            .buttons([
                builder.CardAction.openUrl(session, "http://leverpoint.com/", "Leverpoint")
            ]),
        new builder.HeroCard(session)
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2018/01/RESIZED_logo@2x.png')])
            .buttons([
                builder.CardAction.openUrl(session, "https://itcluster.lviv.ua/en/", "Lviv IT Cluster")
            ]),
        ]);
    session.send(msg).endDialog();
}


function team (session) {
    session.send("I may be biased, but D-Tech Space is organized by some of the most awesome people.");
    session.send("Just look at these faces.");
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel);
    msg.attachments([
        new builder.HeroCard(session)
            .title("Iryna Havryliuk")
            .subtitle("Chief Disruption Officer")
            //.text("some text")
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2017/09/18527741_1723019847725697_4938663103251881203_n-1.jpg')])
            .buttons([
                builder.CardAction.openUrl(session, "https://www.facebook.com/irynaliuk", "Facebook")
            ]),
        new builder.HeroCard(session)
            .title("Vasyl Rakochyi")
            .subtitle("Human Experiences Hacker")
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2017/09/25129907_329161607565995_1799253296_o-1024x1024.jpg')])
            .buttons([
                builder.CardAction.openUrl(session, "https://www.facebook.com/vasyl.rakochyi", "Facebook")
            ]),
        new builder.HeroCard(session)
            .title("Vadym Krook")
            .subtitle("Event Executive")
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2017/12/22384289_395461994201955_5711226740153730584_o-1.jpg')])
            .buttons([
                builder.CardAction.openUrl(session, "https://www.facebook.com/vadkrook", "Facebook")
            ]),
        new builder.HeroCard(session)
            .title("Oksana Tkach")
            .subtitle("Senior Geek")
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2017/09/18447613_1480879985307775_1010483172182561740_n.jpg')])
            .buttons([
                builder.CardAction.openUrl(session, "https://www.facebook.com/oksana.tkach.ua", "Facebook")
            ]),
        new builder.HeroCard(session)
            .title("Karina Menshikova")
            .subtitle("Social Media Trailblazer")
            .images([builder.CardImage.create(session, 'http://d-tech.space/wp-content/uploads/2017/12/KarinaMenshikova-756x1024.jpg')])
            .buttons([
                builder.CardAction.openUrl(session, "https://www.facebook.com/kova.karin", "Facebook")
            ])
    ]);
    session.send(msg).endDialog();
}
