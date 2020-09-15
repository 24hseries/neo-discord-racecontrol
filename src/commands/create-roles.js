const axios = require('axios');

module.exports = {
    name: 'create-roles',
    description: 'Create team roels',
    // The command goes into the execute block
    execute(message) {
        const author = message.author.username;
        const guild = message.guild;

        if(isAuthorAdmin(author)) {
            const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpAu_dPlGTg3GNAaf9VyvN_cnC71ZFEEMPR2dDGXx7FBw7oRL4liWkf5kYKmiNnG_Drr2KOTDgmt7j/pub?gid=0&single=true&output=csv";

            axios.get(url).then(res => res.data.toString());
			createTeamRoles(guild);
		}
		else {
			message.channel.send("I'm sorry, Dave. I'm afraid I can't do that.");
		}
        // permissions calculator: https://discordapi.com/permissions.html#104188993
    }
};

function isAuthorAdmin(username) {
    return username === "NielHekkens" ? true : false;
}

function createTeamRoles(guild) {
    const teamRoles = fetchTeamRoles();
    // for(i = 0; i++; teamRoles.length) {
    //     guild.createRole({
    //         name: i,
    //         permissions: 104188993,
    //         color: 'ORANGE',
    //     })
    //         .then(role => console.log(`Created new role with name ${role.name}`))
    //         .catch(console.error);
    // }
}

function fetchTeamRoles() {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpAu_dPlGTg3GNAaf9VyvN_cnC71ZFEEMPR2dDGXx7FBw7oRL4liWkf5kYKmiNnG_Drr2KOTDgmt7j/pub?gid=0&single=true&output=csv";

     return axios.get(url).then(res => res.data.toString());
    //     .then(result => result.split(","));
}