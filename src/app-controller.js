const { 
	discordBotSecret, 
	webhookId,
	webhookToken,
	prefix 
} = require ("./../config.json");
const fs = require("fs");
const discordJS = require ("discord.js");
const fetch = require('node-fetch');

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

function loopThroughData(json, message) {
	for(let i = 0; i < json.length; i++){
		loopThroughEntry(json[i], message);
	}
}

function loopThroughEntry(entry, message) {
	const roleOfThisEntry = entry.role_name;

	for(let i = 0; i < 8; i++) {
		const selectedDriver = "driver"+i;
		assignRoleToUser(roleOfThisEntry, selectedDriver, message);
	}
}

function assignRoleToUser(userRole, selectedUser, message) {
	const availableRoles = message.guild.roles;
	const role = client.guild.roles.find(value => value.name === userRole);
	const requestedUsername = selectedUser.split(/#+/)[0];
	
	const foundUser = availableRoles.users.find(user => user.username === requestedUsername);
	if(foundUser){
		console.log("ready to assign role");
		// foundUser.addRole(role);
	}
	else{
		return;
	}
}

exports.AppController = AppController;
