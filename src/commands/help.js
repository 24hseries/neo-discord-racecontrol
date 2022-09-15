const discordJS = require("discord.js");

module.exports = {
  name: "help",
  description: "Send the user a message on how to use the chatbot",
  // The command goes into the execure block
  execute(message) {
    const helpMessage = new discordJS.RichEmbed()
      .setColor("#E56A02")
      .setTitle("Available commands")
      .setDescription("These are the commands available:")
      .addField("!ping", "Want to check if the bot is online?")
      .addField(
        "!help",
        "This is where you are now. This gives you a list of available commands."
      )
      .addField(
        "!teamspeak",
        "Gives you the IP address of the Racespot TeamSpeak server."
      )
      .addField("!report", "With this command you can submit a protest.")
      .addField("!served", "Notify race control you served the penalty.")
      .addField("!sheet", "Gives you the URL of the Digital Notice Board.");

    message.channel.send(helpMessage);
  },
};
