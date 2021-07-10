import Discord from 'discord.js';
import {
    discordClientConfig,
    DISCORD_APP_TOKEN,
    DISCORD_APP_CLIENT_ID,
    WEBHOOK_CHANNEL_ID,
    WEBHOOK_TOKEN,
} from '../config';

export const initDiscordApp = () => {
    if (!DISCORD_APP_TOKEN || !DISCORD_APP_CLIENT_ID) {
        throw new Error(
            'No Discord bot token was provided, please set the environment variable DISCORD_APP_TOKEN and DISCORD_APP_CLIENT_ID',
        );
    }
    const clientApp = new Discord.Client(discordClientConfig);

    return clientApp;
};

export const initDiscordWebhookClient = () => {
    if (!WEBHOOK_CHANNEL_ID || !WEBHOOK_TOKEN) {
        throw new Error(
            'No Discord channel information was provided, please set the environment variable WEBHOOK_CHANNEL_ID and WEBHOOK_TOKEN',
        );
    }
    const webhookClient = new Discord.WebhookClient(WEBHOOK_CHANNEL_ID, WEBHOOK_TOKEN, discordClientConfig);

    return webhookClient;
};
