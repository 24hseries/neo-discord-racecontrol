/**
* @file: index.js
* @author: Niel Hekkens <nielhekkens@neo-endurance.com
* @version 1.1
* @copyright © 2017 NEO Endurance, all rights reserved.
**/

const Controller = (function(){
    
    const settings = {
        
        Discord: require('discord.js'),
        Port: process.env.PORT || 3000,
        App: require('http'),
        Config: require("./config.json")
    };
    
    const AppReady = function(client){
      
        client.on("ready", () => {
    
            console.log("I am ready!");
        });
    };
    
    const Commands = function(client){
        const webhook = new settings.Discord.WebhookClient(settings.Config.webhook_id, settings.Config.webhook_token);
        
        // This is an event and the code inside gets triggers when a message is typed.
        client.on("message", (message) => {

            // Exit and stop if it's not there
            if (!message.content.startsWith(settings.Config.prefix)) return;

            if (message.content.startsWith(`${settings.Config.prefix + settings.Config.protest} `) || message.author.bot) {

                // Message in #race-control
                webhook.send(`@here: ${message.author} submitted a protest in #${message.channel.name}: \`\`\`${message.content}\`\`\``);

                // Reply to the person who send the protest
                message.reply(`your protest has been submitted. \n \n Please check the protest sheet for the status of your protest. \n ${settings.Config.url_protestsheet}`);
            }

            else if(message.content.startsWith(`${settings.Config.prefix + settings.Config.help}`) || message.author.bot) {

               message.channel.send(settings.Config.help_message, {"code": "markdown"});
            }
        });
    }
    
    return {
        
        init: function(){
            
            // Set the correct port for Heroku.
            settings.App.createServer().listen(settings.Port, () => {
               
                console.log(`Our app is running on port ${ settings.Port }`);
            });
            
            // Login to Discord.
            const client = new settings.Discord.Client();
            client.login(settings.Config.token);
            
            // Check if the app is ready to go
            AppReady(client);
            
            // Initiate the chat commands.
            Commands(client);            
        }
    }
})();

Controller.init();