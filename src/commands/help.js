const discordJS = require("discord.js");

module.exports = {
	name: 'help',
	description: 'Send the user a message on how to use the chatbot',
	// The command goes into the execure block
	execute(message) {
		const helpMessage = new discordJS.RichEmbed()
			.setColor("#E56A02")
			.setTitle("Available commands")
			.setDescription("These are the commands available:")
			.addField("!ping", "Want to check if the bot is online?")
			.addField("!help", "This is where you are now. This gives you a list of available commands.")
			.addField("!teamspeak", "Gives you the IP address of the NEO Endurance TeamSpeak server.")
			.addField("!report", "With this command you can submit a protest.")
			.addField("!sheet", "Gives you the URL of the race control spreadsheet.")
			.addField("!penalty [car number]", "Notify race control you would like serve a penalty shortly.");
			
		message.channel.send(helpMessage);
	}
};