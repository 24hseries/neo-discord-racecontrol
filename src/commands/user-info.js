module.exports = {
	name: 'user-info',
	description: 'Display user info',
	// The command goes into the execute block
	execute(message) {
        message.channel.send(`Your username: ${message.author.username}#${message.author.discriminator}\nYour ID: ${message.author.id}`);
        console.log(message.author);
	}
};