import { Client, Message } from "whatsapp-web.js";
import AboutCommand from "./about";
import { IArgs } from "./parseCommand";
import PingCommand from "./ping";

export interface CommandContract {
	run: (client: Client, msg: Message, args: IArgs) => Promise<void> | void;
}

export default {
	'about': AboutCommand,
	'ping': PingCommand
} as unknown as { [key: string]: CommandContract };
