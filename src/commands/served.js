const discordJS = require("discord.js");

module.exports = {
	name: "served",
	description: "Let race control know you served the penalty.",
	// The command goes into the execute block
	execute(message) {
		initiatePenaltyServed(message);
	}
};

function sendPenaltyServedToRaceControl(channel, incidentId, lapNumber) {
	const webhookId = process.env.WEBHOOK_SERVED_ID;
	const webhookToken = process.env.WEBHOOK_SERVED_TOKEN;
	const raceControlTextChannel = new discordJS.WebhookClient(webhookId, webhookToken);

	const richEmbedMessage = new discordJS.RichEmbed();
	richEmbedMessage
		.setColor("#E56A02")
		.setTitle("Penalty served")
		.setDescription(`**${channel}** served its penalty.`)
		.addField("Incident no.", incidentId, true)
		.addField("Lap number", lapNumber, true)
		.addBlankField()
		.setTimestamp();

	raceControlTextChannel.send(`${channel} served their penalty`, richEmbedMessage);
}

function confirmPenaltyServedSubmitted(message, incidentId, lapNumber) {
	const urlProtestSheet = "https://docs.google.com/spreadsheets/d/1QorDe5E0TkbYuSNnPBjp-aYq3bQ2Dd8La5gsPY1raLM/edit?usp=sharing";

	const confirmation = new discordJS.RichEmbed();
	confirmation
		.setColor("#E56A02")
		.setTitle("Notification successfully submitted")
		.setDescription(`Thank you ${message.author}, we will confirm your notification shortly. Please check the race control sheet for the status of your penalty. \n \n [NEO live race control sheet](${urlProtestSheet})`)
		.addBlankField()
		.addField("Notification details", "Below you can find the information you submitted:")
		.addField("Incident no.", incidentId, true)
		.addField("Lap number", lapNumber, true)
		.setTimestamp();

	return confirmation;
}

function returnErrorMessage(message) {
	message.channel.send("You waited too long with answering the question. Please restart the procedure by typing `!served`.");
}

function initiatePenaltyServed(message) {
    const initiator = message.author;
    const channel = message.channel.name;
    let incidentId = 0;
    let lapNumber = 0;

    // Ask first question
    message.channel
        .send("Please enter the incident no. you received the penalty for.")
        .then(() => {
            const filter = m => message.author.id === m.author.id;

            message.channel.awaitMessages(filter, {
                    max: 1, 
                    time: 60000,
                    errors: ["time"]
                })
                .then(collected => {
                    incidentId = collected.first().content;

                    // Ask second question
                    message.channel
                        .send("Please provide the lap number when you served the penalty.")
                        .then(() => {
                            const filter = m => message.author.id === m.author.id;

                            message.channel
								.awaitMessages(filter, { 
                                    max: 1, 
                                    time: 60000, 
                                    errors: ["time"] 
                                })
								.then(collected => {
									// save the answer in a variable.
                                    lapNumber = collected.first().content;
                                    
                                    // Send the information to race control
                                    sendPenaltyServedToRaceControl(channel, incidentId, lapNumber);

                                    // Send confirmation to the user.
                                    message.reply(confirmPenaltyServedSubmitted(channel, incidentId, lapNumber));
                                })
                                .catch(collected => returnErrorMessage(message));
                        })
                })
                .catch(collected => returnErrorMessage(message));
        });
}
