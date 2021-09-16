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

/**
 * Handles client request via Express.js. These are usually for custom endpoints or OAuth and app installation.
 * We didn't hook this up to any database, so for out-of-the-box usage, you can hard-code the guild ID and other credentials in a .env file
 */
const expressAppController = async () => {
    const app = express();

    const port = process.env.PORT || 8080;

    // used to add the bot to a server (https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)
    const DISCORD_OAUTH_URL = 'https://discord.com/api/oauth2/authorize';

    // add application install link
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
                        redirect_uri: `http://localhost:${port}`, // redirects to localhost for testing
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

/**
 * The main controller for Discord API requests. Everything that is done from Discord should be written here
 */
const discordAppController = async () => {
    const clientApp = await initDiscordApp();

    clientApp.on('ready', async () => {
        if (clientApp.user) {
            console.log(`${clientApp.user.tag} is ready!`);
        } else {
            console.log(`Failed to login as a user!`);
        }
    });

    // a ping-pong test
    clientApp.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        if (interaction.commandName === 'ping') {
            await interaction.reply('Pong!');
        }
    });

    await clientApp.login(DISCORD_APP_TOKEN);
};
