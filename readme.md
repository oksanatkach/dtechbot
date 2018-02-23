# D-Tech Bot

This is a chatbot for a conference built with Bot Builder SDK.

## Main Features

### Information Level

Basic UI level: the menu that gets you to the most relevant information.

### Payment Level

There is basic integration with Coinbase and Block.io which allows users to pay for tickets with cryptocurrency. You have to set up an API for both of the services. To generate new public address, you have to enter the API key and the secret key, which I have removed from these files. Coinbase API can be configured to only receive payments, not send, so even if somebody can access the source code, the API is relatively safe. I don't know how to set up the same thing for block.io.

### NLU Level

Most UI requests can be performed by simply asking the bot about them: the bot uses LUIS (Microsoft's Natural Language Understanding service) to determine the intent of the user's response. There are also many 'hidden' features. For instance, if you ask something like "What is the current rate of bitcoin?" or "bitcoin rate" or something similar, the bot will parse coinmarketcap and send you the rate of one bitcoin in dollars. This cannot be accessed through the button menu.

LUIS intent analyzer doesn't perform perfectly. From what I can understand, it's a simple maxent classifier. It will return a ton of false positives.
