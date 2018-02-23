var builder = require('botbuilder');

var buy = [
    function (session) {
        builder.Prompts.choice(session, "How do you want to pay?", "Fiat|Crypto", { listStyle: builder.ListStyle.button, maxRetries:0 });
    },
    function (session, results) {
        if (results.resumed > 0) {
            session.send("Cancelling tickets.")
            session.send("What did you say?").endDialog();  
        }
        else if (results.response.entity == "Fiat") {
            session.beginDialog('ticketInfo');
        }
        else if (results.response.entity == "Crypto") {
            session.conversationData.coin = '';
            session.conversationData.rate = '';
            session.conversationData.tickets = '';
            session.conversationData.coin = '';
            session.conversationData.topay = 0;
            session.beginDialog('buyCrypto');
        }
    }
]


function info (session) {
    session.send('The prices go up on March 1st!');
    var msg = new builder.Message(session);
    msg.attachments([
        new builder.HeroCard(session)
            .title("GENERAL")
            .subtitle("$50")
            .text("- Main Stage\n- Expo Zone")
            .buttons([
                builder.CardAction.openUrl(session, "https://2event.com/en/events/1125785", "BUY")
        ]),
        new builder.HeroCard(session)
            .title("POPULAR")
            .subtitle("$60")
            .text("- Main Stage\n- Expo Zone\n- Futuristic Afterparty")
            .buttons([
                builder.CardAction.openUrl(session, "https://2event.com/en/events/1125785", "BUY")
        ]),
        new builder.HeroCard(session)
            .title("VIP")
            .subtitle("$200")
            .text("- Main Stage\n- Expo Zone\n- Futuristic Afterparty\n- VIP CryptoDinner with speakers and special guests")
            .buttons([
                builder.CardAction.openUrl(session, "https://2event.com/en/events/1125785", "BUY")
        ])
    ]);
    session.send(msg).endDialog();
}


var parse = [
    function (session, results, skip) {
        var coin = session.conversationData.coin;
        var rate = session.conversationData.rate;
        if (coin != '' && rate == '') {
            skip({ response: {entity: coin} });
        }
        else if (coin != '') {
            session.endDialogWithResult( { coin: coin, rate: rate } );
        }
        else {
            builder.Prompts.choice(session, "Which coin?", "Bitcoin|BTC Cash|Ether|Doge", { listStyle: builder.ListStyle.button, maxRetries:0 });
        }
    },
    function (session, results) {
        if (session.conversationData.coin == '' && results.resumed > 0) {
            session.send("Cancelling coin selection.")
            session.send("What did you say?").endDialog();   
        }
        else {
            if (results.response.entity == "Bitcoin") {
                var coin = "bitcoin/";
            }
            else if (results.response.entity == "BTC Cash") {
                var coin = "bitcoin-cash/";
            }
            else if (results.response.entity == "Ether") {
                var coin = "ethereum/";
            }
            else if (results.response.entity == "Doge") {
                var coin = "dogecoin/";
            }
            else {
                session.send("OK, cancelling.").endDialog();
            }
            
            const https = require('https');

            var link = 'https://api.coinmarketcap.com/v1/ticker/' + coin;

            https.get(link, (resp) => {
                let data = '';
                
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                
                resp.on('end', () => {
                    var jsn = JSON.parse(data);
                    var coinrate = jsn[0].price_usd;
                    var coinsym = jsn[0].symbol;
                    //session.conversationData.coin = coinsym;
                    //session.conversationData.rate = coinrate;
                    //console.log(coinsym, coinrate);
                    session.endDialogWithResult( { coin: coinsym, rate: coinrate } );
                });
                
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        }
    }
]

var rate = [
    function (session) {
        var msg = session.message.text.toLowerCase();
        var btc_re = /bitcoin|btc/i;
        var bth_re = /cash|bth|bch|bcc/i;
        var eth_re = /ether|eth|ethereum/i;
        var dog_re = /doge|dog|dogecoin/i;

        if (msg.match(bth_re) != null) {
            session.conversationData.coin = 'BTC Cash';
        }

        else if (msg.match(btc_re) != null) {
            session.conversationData.coin = 'Bitcoin';
        }

        else if (msg.match(eth_re) != null) {
            session.conversationData.coin = 'Ether';
        }
        else if (msg.match(dog_re) != null) {
            session.conversationData.coin = 'Doge';
        }

        else {
            session.conversationData.coin = '';
        }

        session.conversationData.rate = '';
        session.beginDialog('parseCrypto');
    },
    function (session, results) {
        if (results.coin && results.rate) {
            session.send(results.coin + ' ' + results.rate);
            session.conversationData.rate = '';
            session.conversationData.coin = '';
        }
        session.endDialog();
    }
]

var crypto = [
    function (session) {
        session.beginDialog('parseCrypto');
    },
    function (session, results) {
        var coin = results.coin;
        var rate = parseFloat(results.rate);
        if (coin == "DOGE") {
            var gen_price = parseInt(50/rate);
            var pop_price = parseInt(60/rate);
            var vip_price = parseInt(200/rate);
        }
        else {
            var gen_price = (50/rate).toFixed(7);
            var pop_price = (60/rate).toFixed(7);
            var vip_price = (200/rate).toFixed(7);
        }

        session.conversationData.gen_price = gen_price;
        session.conversationData.pop_price = pop_price;
        session.conversationData.vip_price = vip_price;
        session.conversationData.coin = coin;

        var msg = new builder.Message(session);
        msg.attachments([
            new builder.HeroCard(session)
                .title("GENERAL")
                .subtitle(coin + " " + gen_price.toString())
                .text("- Main Stage\n- Expo Zone")
                .buttons([
                    builder.CardAction.dialogAction(session, "actionHowMany", "general", "BUY")
                ]),
            new builder.HeroCard(session)
                .title("POPULAR")
                .subtitle(coin + " " + pop_price.toString())
                .text("- Main Stage\n- Expo Zone\n- Futuristic Afterparty")
                .buttons([
                    builder.CardAction.dialogAction(session, "actionHowMany", "popular", "BUY")
                ]),
            new builder.HeroCard(session)
                .title("VIP")
                .subtitle(coin + " " + vip_price.toString())
                .text("- Main Stage\n- Expo Zone\n- Futuristic Afterparty\n- VIP CryptoDinner with speakers and special guests")
                .buttons([
                    builder.CardAction.dialogAction(session, "actionHowMany", "VIP", "BUY")
                ])
        ]);
        if (typeof results.coin == "undefined") {
            session.send('Sorry, I didn\'t understand which coin. Type \'menu\' to start again.').endDialog();
        }
        else {
            session.send('The prices go up on March 1st!');
            session.send(msg).endDialog();
        }
    }
]

var howmany = [
    function (session, results) {
        var type = results.data;
        session.dialogData.type = type;
        session.send("OK, a " + type + " ticket.");
        builder.Prompts.number(session, "How many?", { maxRetries:0 });
    },
    function(session, results) {
        
        if (results.resumed > 0) {
            session.send("Cancelling tickets.")
            session.send("What did you say?").endDialog();  
        }
        else {
            var num = results.response;
            var type = session.dialogData.type;
            session.conversationData.tickets += num + ' ' + type + ', ';

            if (type == "general") {
                var price = session.conversationData.gen_price;
            }
            else if (type == "popular") {
                var price = session.conversationData.pop_price;
            }
            else {
                var price = session.conversationData.vip_price;
            }
    
            if (num == 1) {
                session.send("You want to buy " + num + " " + type + " ticket.");
            }
            else {
                session.send("You want to buy " + num + " " + type + " tickets.");
            }
    
            var topay = price * num;
            var coin = session.conversationData.coin;
            session.conversationData.topay += topay;
    
            session.send("That'll be " + coin + " " + topay + '.');
            builder.Prompts.choice(session, "Is that all?", "Yes|No|Cancel", { listStyle: builder.ListStyle.button, maxRetries:1 });
        }
    },
    function(session, results) {

        if (results.response.entity == "Yes") {
            session.beginDialog('addressTickets');
        }
        else if (results.response.entity == "No") {
            session.send("OK, choose more tickets.");
            session.beginDialog('buyCrypto');
        }
        else {
            session.conversationData.coin = '';
            session.conversationData.rate = '';
            session.endDialog("OK, cancelling.")
        }
    }
]

function address (session, results, skip) {

    var coin = session.conversationData.coin;

    if (coin == "DOGE") {
        var BlockIo = require('block_io');
        var version = 2; // API version
        var block_io = new BlockIo('', '', version);
        block_io.get_new_address({}, function (err, response) {
            skip( { response: {address : response.data.address } } );
        });
    }
    
    else {
        var Client = require('coinbase').Client;
        var client = new Client({
            'apiKey': '',
            'apiSecret': '',
            'version':''
        });

        // send request to coinbase for a new address
        client.getAccounts({}, function(err, accounts) {
            var BTH = accounts[0];
            var ETH = accounts[1];
            var BTC = accounts[2];

            if (coin == "BTC") {
                BTC.createAddress(null, function(err, address) {
                    skip( { response: {address : address.address} } );
                });
            }
            else if (coin == "BTH") {
                BTH.createAddress(null, function(err, address) {
                    skip( { response: {address : address.address} } );
                });
            }
            else if (coin == 'ETH') {
                ETH.createAddress(null, function(err, address) {
                    skip( { response: {address : address.address} } );
                });
            }
            else {
                session.endDialog("OK, cancelling.")
            }
        });
    }
}

var addressTickets = [
    // function (session) {
    //     var coin = session.conversationData.coin;
    //     if (coin == "DOGE") {

    //     }
    // },
    address,
    function (session, results) {
        var coin = session.conversationData.coin;
        var topay = session.conversationData.topay;
        var address = results.response.address;
        var tickets_summary = session.conversationData.tickets;

        if (coin != "DOGE") {
            topay = topay.toFixed(7)
        }
        
        session.send(tickets_summary.slice(0, -2));

        session.send("Great, send " + coin + " " + topay + " to this address: " + address);

        var qr_msg = new builder.Message(session)
        .addAttachment({
            contentUrl: 'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=' + address,
            contentType: 'image/png',
        });
        session.send(qr_msg);
        session.conversationData.address = address;
        session.endDialog();
    }
]

var addressSponsor = [
    function (session) {builder.Prompts.choice(session, "Wow, awesome. Which coin?", "Bitcoin|BTC Cash|Ether|Doge", { listStyle: builder.ListStyle.button, maxRetries:0 });},
    function (session, results, next) {
        if (results.resumed > 0) {
            session.send("Cancelling coin selection.")
            session.send("What did you say?").endDialog();
        }
        else {
            if (results.response.entity == "Bitcoin") {
                session.conversationData.coin = "BTC";
            }
            else if (results.response.entity == "BTC Cash") {
                session.conversationData.coin = "BTH";
            }
            else if (results.response.entity == "Ether") {
                session.conversationData.coin = "ETH";
            }
            else if (results.response.entity == "Doge") {
                session.conversationData.coin = "DOGE";
            }
            else {
                session.send("OK, cancelling.").endDialog();
            }
            next();
        }
    },
    address,
    function (session, results) {
        var coin = session.conversationData.coin;
        var topay = session.conversationData.topay;
        var address = results.response.address;

        session.send("You can send an arbitrary amount to this address: " + address);

        var qr_msg = new builder.Message(session)
        .addAttachment({
            contentUrl: 'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=' + address,
            contentType: 'image/png'
        });
        session.send(qr_msg);

        session.endDialog();
    }
]

var exports = module.exports = {buy, info, parse, rate, crypto, howmany, addressTickets, addressSponsor};
