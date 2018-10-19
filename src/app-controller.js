const { prefix } = require ("./../config.json");
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
		this.discordBotSecret = process.env.DISCORD_SECRET;
		this.port = process.env.PORT || 3000;
	}

	init() {
		this.loginToDiscord();

		client.on("message", message => {
			if (!message.content.startsWith(prefix) || message.author.bot) return;

			const commandName = this.useOnlyFirstWordAsCommand(message);
			const command = client.commands.get(commandName);

			try{
				command.execute(message);
			}
			catch(e){
				message.channel.send("Sorry, I don't recognise this command. Please use `!help` to see the available commands.");

				console.log(e);
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
		// console.log(args);
		return args.shift().toLowerCase()
	}
}

exports.AppController = AppController;
