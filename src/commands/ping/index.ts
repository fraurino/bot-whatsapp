import { Client, Message } from "whatsapp-web.js"
import { CommandContract } from "../commands"
import { IArgs } from "../parseCommand"

class PingCommand implements CommandContract {
	async run(client: Client, msg: Message, args: IArgs) {
		await msg.reply('Pong!');
	}
}

export default new PingCommand()
