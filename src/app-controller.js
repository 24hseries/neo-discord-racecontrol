var http = require("http");

var AppController = (function () {
    function AppController() {
        this.discordSecret = process.env.DISCORD_SECRET;
        this.webhookId = process.env.WEBHOOK_ID;
        this.webhookToken = process.env.WEBHOOK_TOKEN;
        this.port = process.env.PORT || 3000;
    }
    AppController.prototype.init = function () {
        var _this = this;
        http.createServer().listen(this.port, function () {
            console.log("The app is running on port " + _this.port);
        });
    };
    return AppController;
}());

exports.AppController = AppController;
