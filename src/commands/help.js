module.exports = {
	name: 'help',
	description: 'Send the user a message on how to use the chatbot',
	// The command goes into the execure block
	execute(message) {
		const helpMessage = "```To submit a protest, use the command the following command: \n !protest [message] \n \n Please add the following information: \n Cars involved - Time stamp of the incident - Short description of the incident```";

		message.channel.send(helpMessage);
	}
};