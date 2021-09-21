import { discordAppController, expressAppController } from './clients';

/**
 * the main entry function for running the discord application
 */
export default async function app() {
    await discordAppController();
    await expressAppController();
}
