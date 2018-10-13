const fetch = require('node-fetch');

module.exports = {
	name: 'roles',
	description: 'Creates the roles',
	execute(message) {
		const author = message.author.username;
		const guild = message.guild;

		if(isAuthorAdmin(author)) {
			handleAssigningUserRoles(guild, message);
		}
		else {
			message.channel.send("I'm sorry, Dave. I'm afraid I can't do that.");
		}
	}
};

function handleAssigningUserRoles(guild, message) {
	// Get the latest data
	const url = "https://neo-endurance.com/php/discord_data.php";
	fetch(url)
		.then(res => res.json())
		.then(json => {
			loopThroughData(json, guild, message);
		});
}

function isAuthorAdmin(username) {
	return username === "NielHekkens" ? true : false;
}

function loopThroughData(entry, guild, message) {
	for(let i = 0; i < entry.length; i++){
		setTimeout(function() {
			loopThroughEntry(entry[i], guild, message);
		}, 1000);
	}
}

function loopThroughEntry(entry, guild, message) {
	const roleOfThisEntry = entry.role_name;

	for(let i = 0; i < 8; i++) {
		const selectedDriver = "driver"+i;
		if(entry[selectedDriver] !== ""){
			// console.log(`${roleOfThisEntry} - ${entry[selectedDriver]}`);
			const fullUsername = entry[selectedDriver];
			const username = splitUserNameFromDiscriminator(fullUsername);
			
			assignRoleToUser(username, roleOfThisEntry, guild, message);
		}
	}
}

function splitUserNameFromDiscriminator(fullUsername) {
	const username = fullUsername.split(/#+/)[0];
	return username;
}

function fetchUserRole(requestedUserRole, guild) {
	const userRole = guild.roles.find(value => value.name === requestedUserRole);
	return userRole;
}

function fetchUserName(requestedUsername, guild) {
	const user = guild.members.find(value => value.user.username === requestedUsername);
	return user;
}

function assignRoleToUser(userName, userRole, guild, message) {
	const role = fetchUserRole(userRole, guild);
	const user = fetchUserName(userName, guild);

	if(user){
		user.addRole(role)
			.then()
			.catch(console.error);
	}
	else{
		message.channel.send(`I couldn't find ${userName} for the ${userRole}.`);
	}
}