import * as discord from "discord.js";
import * as http from "http";

export class AppController {
	private discordSecret = process.env.DISCORD_SECRET;
	private webhookId = process.env.WEBHOOK_ID;
	private webhookToken = process.env.WEBHOOK_TOKEN;
	private port = process.env.PORT || 3000;

	public init(): void {
		http.createServer().listen(this.port, () => {
			console.log(`The app is running on port ${this.port}`);
		});
	}
}
