import 'dotenv/config';
import path from 'path';
import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';
import handleMsg from './handleMsg';
import startApiServer from './api/server';

// Create the WhatsApp.JS client
const client = new Client({
	authStrategy: new LocalAuth({
		clientId: process.env.BOT_NAME,
		dataPath: path.resolve(__dirname, '..', '.data')
	}),
	puppeteer: {
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--aggressive-cache-discard',
			'--disable-cache',
			'--disable-application-cache',
			'--disable-offline-load-stale-cache',
			'--disk-cache-size=0'
		]
	}
});

// Sets up events and requirements, kicks off authentication request
client.initialize();

// Emitted when the QR code is received
client.on('qr', qr => qrcode.generate(qr, { small: true }));

// Emitted when authentication is successful
client.on('authenticated', () => console.log('AUTHENTICATED'));

// Emitted when authentication fails
client.on('auth_failure', () => console.log('AUTHENTICATION FAILED'));

// Emitted when the client has initialized and is ready to receive messages
client.on('ready', () => {
	console.log('READY TO RECEIVE MESSAGES');
	startApiServer(client);
});

// Emitted when a new message is created, which may include the current user's
client.on('message_create', msg => handleMsg(client, msg));

// Emitted when the client has been disconnected
client.on('disconnected', reason => console.log('Client was logged out', reason));
