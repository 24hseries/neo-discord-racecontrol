module.exports = {
	name: "teamspeak",
	description: "Shows the user the IP address for NEO TeamSpeak server.",
	// The command goes into the execure block
	execute(message) {
		const reply = "The IP address for our TeamSpeak server is: `teamspeak.neo-endurance.com`. Password: `neo-ts`. \n Make sure you use your name and car number as your nickname.";
		
		message.channel.send(reply);
	}
};