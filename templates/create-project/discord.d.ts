import { Message } from "discord.js";

declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, any>
    }

    export interface Command {
        name: string,
        description: string,
        execute: (message: Message, args: string[]) => any // Can be `Promise<any>` if using async
    }
}