import { Client, Message } from "whatsapp-web.js";
import parseCommand from "./commands/parseCommand";
import parseMessage from "./messages/parseMessage";

const {
	BOT_PREFIX = '!'
} = process.env;

export default (client: Client, msg: Message) => {
	const { body, to } = msg;

	// Message is from a group, ignore
	const isGroupMsg = to.includes('@g.us');
	if (isGroupMsg) {
		console.log('Group message received, ignoring...');
		return;
	}

	// Message is empty, ignore
	if (!body) {
		console.log('Empty message received, ignoring...');
		return;
	}

	// Body starts with !, so it's a command
	const isCommand = body.startsWith(BOT_PREFIX);
	if (isCommand) parseCommand(client, msg);
	else parseMessage(client, msg);
}
