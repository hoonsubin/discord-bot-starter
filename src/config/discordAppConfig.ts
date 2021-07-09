import type { ClientOptions } from 'discord.js';

export const discordClientConfig: ClientOptions = { fetchAllMembers: true, disableMentions: 'all' };

const DISCORD_APP_TOKEN = process.env.DISCORD_APP_TOKEN;

const CHANNEL_ID = process.env.CHANNEL_ID;

const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN;

export const CLIENT_MODE = CHANNEL_ID && WEBHOOK_TOKEN ? 'webhook' : 'bot';
