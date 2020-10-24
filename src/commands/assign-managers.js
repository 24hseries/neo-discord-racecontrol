const axios = require("axios");
const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpAu_dPlGTg3GNAaf9VyvN_cnC71ZFEEMPR2dDGXx7FBw7oRL4liWkf5kYKmiNnG_Drr2KOTDgmt7j/pub?gid=839904990&single=true&output=csv";

module.exports = {
    name: "assign-managers",
    description: "Assign the team manager role to the managers.",
    // The command goes into the execute block
    execute(message) {
        const author = message.author.username;
        const guild = message.guild;

        if(isAuthorAdmin(author)) {
            axios.get(csvUrl).then((result) => {
                const resultString = result.data.toString();
                const managersArray = resultString.split("\r\n");
                
                for(let i = 0; i < managersArray.length; i++) {
                    setTimeout(
                        assignTeamManagerRole(managersArray[i], guild, message),
                        1000
                    );
                }
            })
        }
    }
}

function isAuthorAdmin(username) {
    return username === "NielHekkens" ? true : false;
}

function splitUserNameFromDiscriminator(fullUsername) {
	const username = fullUsername.split(/#+/)[0];
	return username;
}

function fetchUserName(requestedUsername, guild) {
    const user = guild.members.find(value => value.user.username === requestedUsername);

	return user;
}

function assignTeamManagerRole(fullUserName, guild, message) {
	const teamManagerRole = "497284098428239883";
    
    const userName = splitUserNameFromDiscriminator(fullUserName);
	const user = fetchUserName(userName, guild);

	if(user){
		user.addRole(teamManagerRole)
			.then()
			.catch(console.error);
	}
	else{
		message.channel.send(`I couldn't find ${userName} to assign the team manager role.`);
	}
}