import { DISCORD_APP_TOKEN } from './config';
import { initDiscordApp, appOauthInstallUrl } from './clients';
import express from 'express';

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

    const installUrl = appOauthInstallUrl();

    // show application install link
    app.get('/install', (_req, res) => {
        // redirect to app install page
        return res.redirect(installUrl);

        // send the install link as a JSON response
        //return res.status(200).json({ url: installUrl });
    });

    // add endpoint for OAuth installation with redirect URLs (https://discord.com/developers/docs/topics/oauth2#authorization-code-grant)
    app.get('/oauth2', async ({ query }, res) => {
        const { code } = query;
        console.log(code);
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
