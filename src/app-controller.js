const { 
	discordBotSecret, 
	webhookId,
	webhookToken,
	prefix 
} = require ("./../config.json");
const fs = require("fs");
const discordJS = require ("discord.js");

const client = new discordJS.Client();
client.commands = new discordJS.Collection();

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


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

			const command = this.useOnlyFirstWordAsCommand(message);

			try{
				client.commands.get(command).execute(message);
			}
			catch(e){
				message.channel.send("Sorry, I don't recognise this command. Please use `!help` to see the available commands.");
			}
		});
	};

	loginToDiscord() {
		client.on('ready', () => {
			console.log('Ready!');
		});

		client.login(this.discordBotSecret);
	}

	useOnlyFirstWordAsCommand(message) {
		const args = message.content.slice(prefix.length).split(/ +/);
		return args.shift().toLowerCase()
	}
}

exports.AppController = AppController;
