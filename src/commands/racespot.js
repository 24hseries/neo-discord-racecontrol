module.exports = {
	name: "racespot",
	description: "Shows the user the IP address for Racespot Teamspeak server.",
	// The command goes into the execure block
	execute(message) {
		const reply = "The IP address for the Racespot Teamspeak server is: `ts.racespot.tv:9988`. \n Make sure you use your name and teamname as your nickname.";
		
		message.channel.send(reply);
	},
};