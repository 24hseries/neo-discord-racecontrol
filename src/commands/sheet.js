const discordJS = require("discord.js");

module.exports = {
	name: 'sheet',
	description: 'Gives you the URL of the protest spreadsheet.',
	execute(message) {
		const urlProtestSheet = "https://docs.google.com/spreadsheets/d/1QorDe5E0TkbYuSNnPBjp-aYq3bQ2Dd8La5gsPY1raLM/edit?usp=sharing";

		const protestSheetMessage = new discordJS.RichEmbed()
			.setColor("#E56A02")
			.setTitle("Live protest sheet")
			.setDescription(`The protest sheet is available here: [NEO live protest sheet](${urlProtestSheet})`);
			
		message.channel.send(protestSheetMessage);
	}
};