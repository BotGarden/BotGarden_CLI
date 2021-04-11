import
Discord, {
    Client
} from 'discord.js';
import fs from 'fs';

class BaseBot {
    botClient: Client;
    token: string;
    prefix: string;
    definedCommands: string[];
    botDirName: string;
    botName: string;

    constructor(properties: any) {
        this.botClient = new Discord.Client();
        this.token = properties.token;
        this.prefix = properties.prefix;
        this.definedCommands = properties.commands;
        this.botDirName = properties.botDirName;
        this.botClient.commands = new Discord.Collection();
        this.botName = properties.botFileName.replace(".js", "");
    }

    async run() {
        await this.setBotCommands();
        await this.botLogin();
    }

    private async botLogin() {
        const loginPromise = new Promise((accept, reject) => {
            this.botClient.on("ready", async () => {
                console.log(`[INFO] ${this.botName} is now online`);
                console.log("====================================");
                accept("");
            });
            this.botClient.login(this.token);
        });
        return loginPromise;
    }

    private setBotCommands(): void {
        const currDir: string = process.cwd();
        const commandsDir: string = `${currDir}/build/commands`;
        console.log(`[INFO] Retrieving commands for: ${this.botName}`);
        const commandFiles = fs.readdirSync(commandsDir)
            .filter(file =>
                file.endsWith('.js')
            )
        let allBotCommands: string[] = [];
        for (const file of commandFiles) {
            const command = require(`${commandsDir}/${file}`);
            const commandName = file.replace(".js", "");
            if (this.definedCommands.includes(commandName)) {
                console.log(`[INFO] Setting the "${command.name}" command`);
                allBotCommands.push(command.name);
                this.botClient.commands.set(command.name, command);
            }
        }
        console.log(`[INFO] Your bot has at least ${allBotCommands.length} defined commands`);
        this.botClient.on('message', message => {
            if (!message.content.startsWith(this.prefix) || message.author.bot) return;
            const args = message.content.slice(this.prefix.length).trim().split(/ +/);
            const command: string | undefined = args.shift()?.toLowerCase();
            if (!this.botClient.commands.has(command)) return;
            try {
                this.botClient.commands.get(command).execute(message, args);
            } catch (error) {
                console.error(error);
                message.reply('there was an error trying to execute that command!');
            }
        });
    }
}
export { BaseBot }