module.exports = {
	name: 'ping',
	description: 'Ping!',
	// The command goes into the execure block
	execute(message, args) {
		message.channel.send('Pong.');
	},
};