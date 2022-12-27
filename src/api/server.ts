import Http from 'http';
import Express from 'express';
import { Client } from 'whatsapp-web.js';
import apiRoutes from './routes';

export default (client: Client) => {
	// Create a new Express application
	const expressApp = Express();
	expressApp.use(Express.json());	// Parse the JSON body
	expressApp.use(Express.urlencoded({ extended: true })); // Parse the URL-encoded body

	// Load the API routes
	expressApp.use('/api', apiRoutes(client));

	// Create a new HTTP server
	const httpServer = Http.createServer(expressApp);

	// Serve the server
	httpServer.listen(process.env.API_PORT, () => console.log('Server running on port:', process.env.API_PORT));
};
