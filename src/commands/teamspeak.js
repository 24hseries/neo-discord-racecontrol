module.exports = {
	name: "teamspeak",
	description: "Shows the user the IP address for the Racespot TeamSpeak server.",
	// The command goes into the execure block
	execute(message) {
		const reply = "The IP address for the Racespot TeamSpeak server is: `ts.racespot.tv`. \n Make sure you use your name and car number as your nickname.";
		
		message.channel.send(reply);
	}
};
