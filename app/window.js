const { app, nativeTheme } = require("electron"),
    path = require("path"),
    os = require("os"),
    url = require('url');
module.exports = {
    createWindow: (content) => {
        const { BrowserWindow } = require("electron");
        app.commandLine.appendSwitch("--force_high_performance_gpu");
        nativeTheme.themeSource = "system";
        const window = new BrowserWindow({
            title: "EnderGaming",
            width: 360,
            height: 840,
            center: true,
            frame: true,
            show: false,
            //icon: path.join("./resources/main.ico"),
            webPreferences: {
                devTools: true,
                nodeIntegration: true,
                nodeIntegrationInWorker: true,
                nodeIntegrationInSubFrames: true,
                preload: path.join("preload.js"),
                sandbox: false,
                enableRemoteModule: true,
                javascript: true,
                webSecurity: true,
                allowRunningInsecureContent: false,
                images: true,
                textAreasAreResizable: false,
                webgl: true,
                plugins: false,
                experimentalFeatures: false,
                offscreen: false,
                contextIsolation: false,
                nativeWindowOpen: false,
                autoplayPolicy: "no-user-gesture-required",
                spellcheck: true,
                webviewTag: true
            },
            resizable: true,
            maximizable: true,
            minimizable: true,
            closable: true,
            fullscreenable: false,
            minHeight: 560,
            minWidth: 840,
            paintWhenInitiallyHidden: false,
            transparent: false,
            titleBarStyle: "custom"
        });
        window.setBackgroundColor((nativeTheme.shouldUseDarkColors) ? '#000000' : '#ffffff');
        window.webContents.openDevTools({ mode: 'docked' });
        window.setMenu(null);
        window.setSize(840, 560);
        const { screen } = require('electron');
        var dimensions = screen.getPrimaryDisplay().size;
        dimensions.width = Math.round((dimensions.width - 940) / 2);
        dimensions.height = Math.round((dimensions.height - 560) / 2);
        window.setPosition(dimensions.width, dimensions.height);
        /*win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
            callback({ responseHeaders: Object.fromEntries(Object.entries(details.responseHeaders).filter(header => !/x-frame-options/i.test(header[0]))) });
        });*/
        /*win.loadURL(url.format({
            pathname: path.join('framework', 'window.html'),
            protocol: "file",
            slashes: true
        }));*/
        window.on('closed', () => {
            win = null;
        });
        window.on('unresponsive', () => {
            console.log("The app is unresponsive!");
            app.quit();
        });
        /*win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
            Object.assign(options, {
                show: false
            });
        });*/
        return window;
    }
};