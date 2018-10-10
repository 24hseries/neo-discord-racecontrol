module.exports = {
	name: 'ping',
	description: 'Ping!',
	// The command goes into the execure block
	execute(message) {
		message.channel.send('External pong.');
	}
};