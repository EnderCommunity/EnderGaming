const { app } = require("electron");
app.on('ready', function() {
    require("./window").createWindow(0).show();
});