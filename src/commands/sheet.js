const discordJS = require("discord.js");

module.exports = {
	name: 'sheet',
	description: 'Provides the URL of the digital notice board.',
	execute(message) {
		const urlProtestSheet = "https://docs.google.com/spreadsheets/d/1bPSgzSZrbZf5oVVouYWRf4q2Ug_q0KWno2du13Un_lM/edit?usp=sharing";

		const protestSheetMessage = new discordJS.RichEmbed()
			.setColor("#E56A02")
			.setTitle("Digital notice board")
			.setDescription(`The digital notice board is available here: [24H SERIES ESPORTS digital notice board](${urlProtestSheet})`);
			
		message.channel.send(protestSheetMessage);
	}
};
