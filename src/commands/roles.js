const fetch = require('node-fetch');

module.exports = {
	name: 'roles',
	description: 'Creates the roles',
	execute(message) {
		const guild = message.guild;
		const user = guild.members.find(value => value.user.username === "Fabio Mantellini");
		const findRole = guild.roles.find(value => value.name === "4 - Mivano Racing");
		
		user.addRole(findRole)
			.then()
			.catch(console.error);
		// message.channel.send(`?role Fabio Mantellini#7815 @${findRole.name}`);
	}
};

function isAuthorAdmin(username) {
	return username === "NielHekkens" ? true : false;
}

// const username = message.author.username;
		// const guild = message.guild;
		// const availableRoles = guild.roles;

		// const findRole = guild.roles.find(value => value.name === "3 - Mivano Racing");
		// const member = guild.users.find(value => value.username === "NielHekkens");
		// member.addRole(findRole);

		// if(isAuthorAdmin(username)) {
		// 	// handleUserRoles(availableRoles);
		// }
		// else {
		// 	message.channel.send("I'm sorry, Dave. I'm afraid I can't do that.");
		// }

// function handleUserRoles(availableRoles) {
// 	// Get the latest data
// 	const url = "https://neo-endurance.com/php/discord_data.php";
// 	fetch(url)
// 		.then(res => res.json())
// 		.then(json => {
// 			loopThroughData(json);
// 		});
// }

// function loopThroughData(json) {
// 	for(let i = 0; i < json.length; i++){
// 		loopThroughEntry(json[i]);
// 	}
// }

// function loopThroughEntry(entry) {
// 	const roleOfThisEntry = entry.role_name;

// 	for(let i = 0; i < 8; i++) {
// 		const selectedDriver = "driver"+i;
// 		assignRoleToUser(roleOfThisEntry, selectedDriver);
// 	}
// }

// function assignRoleToUser(userRole, selectedUser) {
// 	const role = availableRoles.find(value => value.name === userRole);
// 	const requestedUsername = selectedUser.split(/#+/)[0];
	
// 	client.users.find(user => user.username === requestedUsername);
// }