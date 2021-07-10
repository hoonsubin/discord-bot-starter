import type { ClientOptions } from 'discord.js';

export type ClientMode = 'webhook' | 'bot';

export const discordClientConfig: ClientOptions = { fetchAllMembers: true, disableMentions: 'all' };

export const DISCORD_APP_TOKEN = process.env.DISCORD_APP_TOKEN;

export const DISCORD_APP_CLIENT_ID = process.env.DISCORD_APP_CLIENT_ID;

export const WEBHOOK_CHANNEL_ID = process.env.WEBHOOK_CHANNEL_ID;

export const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN;

export const clientAppMode: ClientMode = WEBHOOK_CHANNEL_ID && WEBHOOK_TOKEN ? 'webhook' : 'bot';
