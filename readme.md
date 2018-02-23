## Use Azure app service editor

1. make code change in the online editor: Botloh (Web App Bot) > Build > Open online code editor

Your code changes go live as the code changes are saved.

## Use Visual Studio Code

### Build and debug
1. Pull from git OR download source code zip: Botloh (Web App Bot) > Build > Download zip file
2. open the source folder in  Visual Studio Code
3. make code changes
4. Double check keys in env variables (`.env` file)
5. download and run [botframework-emulator](https://emulator.botframework.com/)
6. connect the emulator to http://localhost:3987/api/messages  (Misrosoft App ID and password are in `.env`)

### Publish back

**Note**: continuous integration is not used due to private git repository (not accesible from Azure)

Use either command:

```
npm run publish
node publish.js
Launch 'publish' command from VSCode
```

## Use continuous integration

If you have setup continuous integration, then your bot will automatically deployed when new changes are pushed to the source repository.

