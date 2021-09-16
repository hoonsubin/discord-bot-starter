import Discord from 'discord.js';
import { Client, Intents } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { DISCORD_APP_TOKEN, DISCORD_APP_CLIENT_ID, DISCORD_GUILD_ID } from '../config';

export const slashCommands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

export const initDiscordApp = async () => {
    if (!DISCORD_APP_TOKEN || !DISCORD_APP_CLIENT_ID || !DISCORD_GUILD_ID) {
        throw new Error(
            'No Discord bot token was provided, please set the environment variable DISCORD_APP_TOKEN and DISCORD_APP_CLIENT_ID',
        );
    }

    const rest = new REST({ version: '9' }).setToken(DISCORD_APP_TOKEN);
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(DISCORD_APP_CLIENT_ID, DISCORD_GUILD_ID), {
            body: slashCommands,
        });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }

    const clientApp = new Client({ intents: [Intents.FLAGS.GUILDS] });

    return clientApp;
};
