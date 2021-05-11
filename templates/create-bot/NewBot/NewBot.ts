import path from 'path';
import properties from './properties.json'
import { BaseBot } from "../BaseBot";
import * as dotenv from 'dotenv';
if (process.env.NODE_ENV !== "production") {
    dotenv.config()
}

let allProperties: any = {
    token: process.env.NEWBOT_TOKEN,
    prefix: properties.prefix,
    commands: properties.commands,
    botDirName: path.basename(__dirname),
    botFileName: path.basename(__filename)
}
export class NewBot extends BaseBot {
    constructor() {
        super(allProperties);
    }
    async run() {
        await super.run();
    }
}