const discordJS = require("discord.js");

module.exports = {
  name: "report",
  description: "Submit a report.",
  // The command goes into the execute block
  execute(message) {
    initiateProtest(message);
  },
};

function sendProtestToRaceControl(
  author,
  channel,
  carsInvolved,
  timeStamp,
  reason
) {
  const webhookId = process.env.WEBHOOK_ID;
  const webhookToken = process.env.WEBHOOK_TOKEN;
  const raceControlTextChannel = new discordJS.WebhookClient(
    webhookId,
    webhookToken
  );

  const richEmbedMessage = new discordJS.RichEmbed();
  richEmbedMessage
    .setColor("#E56A02")
    .setTitle("Incident report")
    .setDescription(`${author} reported an incident in #${channel}`)
    .addField("Cars involved", carsInvolved, true)
    .addField("Timestamp", timeStamp, true)
    .addField("Description", reason)
    .addBlankField()
    .setTimestamp();

  raceControlTextChannel.send(
    `@here: new incident reported from #${channel}`,
    richEmbedMessage
  );
}

function confirmProtestSubmitted(message, carsInvolved, timeStamp, reason) {
  const urlProtestSheet =
    "https://docs.google.com/spreadsheets/d/1QorDe5E0TkbYuSNnPBjp-aYq3bQ2Dd8La5gsPY1raLM/edit?usp=sharing";

  const protestConfirmation = new discordJS.RichEmbed();
  protestConfirmation
    .setColor("#E56A02")
    .setTitle("Report successfully submitted")
    .setDescription(
      `Thank you ${message.author}, your report is successfully submitted. Please check the Digital Notice Board for the status of your report. \n \n [Digital Notice Board](${urlProtestSheet})`
    )
    .addBlankField()
    .addField(
      "Report details",
      "Below you can find the information you submitted:"
    )
    .addField("Cars involved", carsInvolved, true)
    .addField("Timestamp", timeStamp, true)
    .addField("Description", reason)
    .setTimestamp();

  message.reply(protestConfirmation);
}

function returnErrorMessage(message) {
  message.channel.send(
    "You waited too long with answering the question. Please restart the procedure by typing `!report`."
  );
}

function initiateProtest(message) {
  let initiator = message.author;
  let channel = message.channel.name;
  let carsInvolved = undefined;
  let timeStamp = undefined;
  let reason = undefined;

  message.channel
    .send(
      "Please answer the following questions: \n Which car(s) are involved in the incident?"
    )
    .then(() => {
      const filter = (m) => message.author.id === m.author.id;

      message.channel
        .awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] })
        .then((collected) => {
          carsInvolved = collected.first().content;

          // ask second question
          message.channel
            .send("What is the time stamp of the incident?")
            .then(() => {
              const filter = (m) => message.author.id === m.author.id;

              message.channel
                .awaitMessages(filter, {
                  max: 1,
                  time: 60000,
                  errors: ["time"],
                })
                .then((collected) => {
                  // save the answer in a variable.
                  timeStamp = collected.first().content;

                  // ask third question
                  message.channel
                    .send("Please provide a short description of the incident:")
                    .then(() => {
                      const filter = (m) => message.author.id === m.author.id;

                      message.channel
                        .awaitMessages(filter, {
                          max: 1,
                          time: 90000,
                          errors: ["time"],
                        })
                        .then((collected) => {
                          // save the answer in a variable.
                          reason = collected.first().content;

                          // send the protest to race control
                          sendProtestToRaceControl(
                            initiator,
                            channel,
                            carsInvolved,
                            timeStamp,
                            reason
                          );

                          // send confirmation to the user
                          confirmProtestSubmitted(
                            message,
                            carsInvolved,
                            timeStamp,
                            reason
                          );
                        })
                        .catch((collected) => returnErrorMessage(message));
                    });
                })
                .catch((collected) => returnErrorMessage(message));
            });
        })
        .catch((collected) => returnErrorMessage(message));
    });
}
