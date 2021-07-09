import Discord from 'discord.js';
import { discordClientConfig } from '../config';

// Create an instance of a Discord client app
export const discordApp = new Discord.Client(discordClientConfig);
