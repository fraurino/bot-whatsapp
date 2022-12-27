import { Router } from "express";
import { Client } from "whatsapp-web.js";

const router = Router();

// Routes are defined in this file
export default (client: Client) => {
	router.get('/', (req, res) => {
		res.json({ message: 'Hello World!' });
	});

	return router;
}
