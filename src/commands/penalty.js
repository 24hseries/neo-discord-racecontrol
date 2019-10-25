const discordJS = require("discord.js");

module.exports = {
	name: 'penalty',
	description: 'Serve the penalty',
	execute(message) {
		// Check if the message starts with the command.

		// If the message has the command, call processCommand();
		message.channel.send(`Don't ping me. Leave me alone.`);
	}
};


function processCommand() {
	// extract car number from the message.
	
	// Create message and send message to race control.

	// Create message and send confirmation to the channel.
}

function sendNotificationToRaceControl(author, channel, carsInvolved, timeStamp, reason) {
	const webhookId = process.env.WEBHOOK_ID;
	const webhookToken = process.env.WEBHOOK_TOKEN;
	const raceControlTextChannel = new discordJS.WebhookClient(webhookId, webhookToken);

	const richEmbedMessage = new discordJS.RichEmbed();
	richEmbedMessage
		.setColor("#E56A02")
		.setTitle("Incident report")
		.setDescription(`${author} reported an incident in #${channel}`)
		.addField("Cars involved", carsInvolved, true)
		.addField("Timestamp", timeStamp, true)
		.addField("Description", reason)
		.addBlankField()
		.setTimestamp();

	raceControlTextChannel.send(`@here: new incident reported from #${channel}`, richEmbedMessage);
}