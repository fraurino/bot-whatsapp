import { Client, Message } from "whatsapp-web.js";

export default (client: Client, msg: Message) => {
	console.log('Message received:', msg.body);
}
