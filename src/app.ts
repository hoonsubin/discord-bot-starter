import type { Message } from 'discord.js';
import { DISCORD_APP_TOKEN } from './config';
import { initDiscordApp } from './clients';
import express from 'express';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

/**
 * the main entry function for running the discord application
 */
export default async function app() {
    await discordAppController();
    await expressAppController();
}

const expressAppController = async () => {
    const app = express();

    const port = process.env.PORT || 8080;

    const DISCORD_OAUTH_URL = 'https://discord.com/api/oauth2/authorize';

    app.get('/install', (_req, res) => {
        return res.send('<h1>Hello World</h1>');
    });

    app.get('/oauth2', async ({ query }, res) => {
        const { code } = query;

        if (typeof code === 'string') {
            try {
                const oauthRes = await fetch('https://discord.com/api/oauth2/token', {
                    method: 'POST',
                    body: new URLSearchParams({
                        client_id: 'clientID',
                        client_secret: 'clientSecret',
                        code,
                        grant_type: 'authorization_code',
                        redirect_uri: `http://localhost:${port}`,
                        scope: 'identify',
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                const oauthData = await oauthRes.json();
                console.log(oauthData);
                return res.status(200).send('<h1>App has been successfully installed!</h1>');
            } catch (err) {
                console.error(err);
                return res.status(401).send('<h1>Something went wrong during the authorization process</h1>');
            }
        }
    });

    app.listen(port, () => console.log(`App listening at port ${port}`));
};

const discordAppController = async () => {
    const clientApp = initDiscordApp();

    clientApp.on('ready', async () => {
        const applicationInfo = await clientApp.fetchApplication();

        console.log(`${applicationInfo.name} is ready!`);
    });

    clientApp.on('message', pingPongMsgHandler);

    await clientApp.login(DISCORD_APP_TOKEN);
};

const pingPongMsgHandler = async (message: Message) => {
    const contextChannel = message.channel;
    console.log(JSON.stringify(message));

    if (message.content.startsWith('ping')) {
        await contextChannel.send('pong');
    }
};
