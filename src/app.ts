import Discord, { Message } from 'discord.js';

const TOKEN = process.env.DISCORD_TOKEN;
const CALLBACK_SERVER_ID = process.env.CALLBACK_SERVER_ID;

/**
 * the main entry function for running the discord application
 */
export default async function main() {
    if (!TOKEN || !CALLBACK_SERVER_ID) throw new Error('Please provide discord bot credentials');
    // Create a discord channel webhook client
    //const webhookClient = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

    // Create an instance of a Discord client app
    const client = new Discord.Client({ fetchAllMembers: true, disableMentions: 'all' });

    /**
     * The ready event is vital, it means that only _after_ this will your bot start reacting to information
     * received from Discord
     */
    client.on('ready', async () => {
        const applicationInfo = await client.fetchApplication();

        console.log(`${applicationInfo.name} has started`);
    });

    client.on('message', async (message: Message) => {
        const conextChannel = message.channel;

        if (message.content.startsWith('ping')) {
            conextChannel.send('pong');
            //message.author.send('pong');
        }
    });

    // Log our bot in using the token from https://discord.com/developers/applications
    await client.login(TOKEN);
}
