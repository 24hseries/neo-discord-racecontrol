const axios = require('axios');
// permissions calculator: https://discordapi.com/permissions.html#104188993
// Team permissions number: 104188993

module.exports = {
    name: 'create-roles',
    description: 'Create team roles',
    // The command goes into the execute block
    execute(message) {
        const author = message.author.username;
        const guild = message.guild;

        if(isAuthorAdmin(author)) {
            const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpAu_dPlGTg3GNAaf9VyvN_cnC71ZFEEMPR2dDGXx7FBw7oRL4liWkf5kYKmiNnG_Drr2KOTDgmt7j/pub?gid=0&single=true&output=csv";

            axios.get(url).then((result) => {
                const resultString = result.data.toString();
                const teamRolesArray = resultString.split("\r\n");

                for(let i = 0; i < teamRolesArray.length; i++) {
                    guild.createRole({
                        name: teamRolesArray[i],
                        permissions: 104188993,
                        color: 'ORANGE',
                    }) 
                }
            })
                .then(message.channel.send("Team roles created"))
                .catch(console.error);;
		}
		else {
			message.channel.send("I'm sorry, Dave. I'm afraid I can't do that.");
		}
    }
};

function isAuthorAdmin(username) {
    return username === "NielHekkens" ? true : false;
}
