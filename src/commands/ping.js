module.exports = {
	name: 'ping',
	description: 'Ping!',
	// The command goes into the execure block
	execute(message) {
		message.channel.send(`Don't ping me. Leave me alone.`);
	}
};