module.exports = {
	name: 'ping',
	description: 'Ping!',
	// The command goes into the execute block
	execute(message) {
		message.channel.send(`Don't ping me. Leave me alone.`);
	}
};