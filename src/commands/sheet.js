const discordJS = require("discord.js");

module.exports = {
  name: "sheet",
  description: "Provides the URL of the Digital Notice Board.",
  execute(message) {
    const urlProtestSheet =
      "https://docs.google.com/spreadsheets/d/1bPSgzSZrbZf5oVVouYWRf4q2Ug_q0KWno2du13Un_lM/edit?usp=sharing";

    const protestSheetMessage = new discordJS.RichEmbed()
      .setColor("#E56A02")
      .setTitle("Digital notice board")
      .setDescription(
        `The Digital Notice Board is available here: [24H SERIES ESPORTS Digital Notice Board](${urlProtestSheet})`
      );

    message.channel.send(protestSheetMessage);
  },
};
