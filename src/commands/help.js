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
			.addField("!help", "This is where you are now. This gives you a list of available commands.")
			.addField("!protest", "With this command you can submit a protest.")
			.addField("!racespot", "Gives you the IP address of the Racespot TeamSpeak server.")
			.addField("!ping", "Want to check if the bot is online?");
			
		message.channel.send(helpMessage);
	}
};