const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});

    console.log(process.platform);

    mainWindow.loadURL(
        url.format( {
            pathname: path.join(__dirname, "main.html"),
            protocol: "file:",
            slashes: true
        })
    );

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
})




const mainMenuTemplate = [
    {
        label:"Dosya",
        submenu: [
            {
                label: "Aç"
            },
            {
                label: "Export"
            },
            {
                label: "Çıkış",
                accelerator: process.platform == "darwin" ? "Command + Q" : "Ctrl+Q",
                role: "quit" 
            }
             
        ]
    }
]

//macintoshta hata verecek menü sisteminin hata vermemesi için yazılan kod
if(process.platform == "darwin"){
    mainMenuTemplate.unshift({
        label: app.getName(),
        role: "Scenario"
    })
}
if(process.env.NODE_ENV !== "production "){
    mainMenuTemplate.push(
        {
            label:"Dev tools",
            submenu: [
                {
                    label: "Geliştirici Penceresini Aç",
                    click(item, focusedWindows){
                        focusedWindows.toggleDevTools();
                    }
                },
                {
                    label: "yenile",
                    role: "reload"
                }
            ]
        }
    )
}