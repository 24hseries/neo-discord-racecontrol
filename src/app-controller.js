const discordJS = require ("discord.js");
const client = new discordJS.Client();
const { 
	discordBotSecret, 
	webhookId,
	webhookToken,
	prefix 
} = require ("./../config.json");

class AppController {
	constructor() {
		this.discordBotSecret = discordBotSecret; //process.env.DISCORD_SECRET;
		this.webhookId = webhookId; //process.env.WEBHOOK_ID;
		this.webhookToken = webhookToken; //process.env.WEBHOOK_TOKEN;
		this.port = process.env.PORT || 3000;
	}

	init() {
		this.loginToDiscord();

		client.on("message", message => {
			if (!message.content.startsWith(prefix) || message.author.bot) return;

			if (message.content === '!ping') {
				// send back "Pong." to the channel the message was sent in
				message.channel.send('Pong.');
			}
		});
	};

	loginToDiscord() {
		client.on('ready', () => {
			console.log('Ready!');
		});

		client.login(this.discordBotSecret);
	}
}

exports.AppController = AppController;
