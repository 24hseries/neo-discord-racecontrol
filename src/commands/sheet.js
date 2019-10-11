const discordJS = require("discord.js");

module.exports = {
	name: 'sheet',
	description: 'Gives you the URL of the race control spreadsheet.',
	execute(message) {
		const urlProtestSheet = "https://docs.google.com/spreadsheets/d/1QorDe5E0TkbYuSNnPBjp-aYq3bQ2Dd8La5gsPY1raLM/edit?usp=sharing";

		const protestSheetMessage = new discordJS.RichEmbed()
			.setColor("#E56A02")
			.setTitle("Live race control sheet")
			.setDescription(`The race control sheet is available here: [NEO live race control sheet](${urlProtestSheet})`);
			
		message.channel.send(protestSheetMessage);
	}
};