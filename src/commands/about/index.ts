import { Client, Message } from "whatsapp-web.js"
import { CommandContract } from "../commands"
import { IArgs } from "../parseCommand"

const {
	BOT_NAME = 'Whatsapp Bot'
} = process.env;

class AboutCommand implements CommandContract {
	run(client: Client, msg: Message, args: IArgs) {
		msg.reply(
			`*${BOT_NAME}*\n\n` +
			`Created by: *Felipe Medeiros*\n` +
			`Source code: _Coming soon_\n\n` +

			`*Avaliable commands:*\n` +
			`*!ping* - _Check if the bot is online_\n` +
			`*!about* - _About the bot_`
		)
	}
}

export default new AboutCommand()
