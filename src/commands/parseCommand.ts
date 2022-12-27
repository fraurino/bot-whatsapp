import { Client, Message } from "whatsapp-web.js";
import availableCommands from "./commands";

export interface IArgs {
	[key: string]: any;
}

const handleArgValue = (arg: any) => {
	const isNumber = !isNaN(arg);
	if (isNumber) return Number(arg);

	const isBoolean = arg === 'true' || arg === 'false';
	if (isBoolean) return arg === 'true';

	return arg;
}


const extractArgs = (body: string) => {
	const args = body.trim().split('--').filter(Boolean);

	const argsObj = args.reduce((acc: IArgs, arg) => {
		const [ key ] = arg.split(' ').filter(Boolean);
		const value = arg.replace(key, '').trim();
		if (key) acc[key] = handleArgValue(value) || true;
		return acc;
	}, {});

	return argsObj;
}

export default (client: Client, msg: Message) => {
	const [ command ] = msg.body.split(' ');

	// Extract arguments from the message body
	const args = extractArgs(msg.body.replace(command, ''));

	// Check if the command exists
	const commandExists = Object.keys(availableCommands).includes(command.slice(1));
	if (!commandExists) {
		console.log('Command not found');
		return;
	}

	// Get the command without the prefix
	const commandWithoutPrefix = command.slice(1);

	try {
		// Run the command
		availableCommands[commandWithoutPrefix].run(client, msg, args);
	} catch (error) {
		console.log('Error running command:', error);
	}
}
