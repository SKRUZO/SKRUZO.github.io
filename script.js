const NAME = "Calvin";
const WELCOME_MESSAGE_TEMPLATE = ["evening", "morning", "afternoon", "evening"];

// All shortcuts are in a `SHORTCUT_STARTER+shortcutKey` format. 
// So, for example, pressing `tab+q` would redirect you to https://google.com/?q=q
const SHORTCUT_STARTER = 'tab' 

// How much time (in milliseconds) you have to press shortcutKey after pressing SHORTCUT_STARTER.
// Also change --SHORTCUT_TIMEOUT in styles.css if you change this option.
const SHORTCUT_TIMEOUT = 3500;

// The groups of links are generated from this object. Edit it to edit the page's contents.
// shortcutKey must hold an all-lowercase single button. Theoretically should work with values like `esc` and `f1`,
// but intended to be used with just regular latin letters.
const MASTER_MAP = [
    {
        "groupName": "Entertainment",
        "items":[
            {"name": "Reddit", "shortcutKey": "q", "url": "https://old.reddit.com/r/all"},
            {"name": "/r/AvX", "shortcutKey": "w", "url": "https://old.reddit.com/r/AVexchange/new"},
            {"name": "YouTube", "shortcutKey": "e", "url": "https://www.youtube.com"},
            {"name": "Patreon", "shortcutKey": "r", "url": "https://www.patreon.com/home"},
            {"name": "Netflix", "shortcutKey": "", "url": "https://www.netflix.com"},
            {"name": "Twitch", "shortcutKey": "", "url": "https://www.twitch.tv"}
        ]
    },
    {
        "groupName": "Other",
        "items":[
            {"name": "Roll20", "shortcutKey": "", "url": "https://www.patreon.com/home"},
            {"name": "MetaBattle", "shortcutKey": "", "url": "https://metabattle.com/wiki/MetaBattle_Wiki"},
            {"name": "SnowCrows", "shortcutKey": "", "url": "https://snowcrows.com/"},
            {"name": "SatMap", "shortcutKey": "", "url": "https://www.satisfactorymap.com"},
            {"name": "SatWiki", "shortcutKey": "", "url": "https://satisfactory.gamepedia.com/Satisfactory_Wiki"},
            {"name": "SatCalc", "shortcutKey": "", "url": "https://satisfactory.greeny.dev/calculator"}
        ]
    },
    {
        "groupName": "Personal",
        "items":[
            {"name": "Gmail", "shortcutKey": "a", "url": "https://mail.google.com"},
            {"name": "Massdrop", "shortcutKey": "s", "url": "https://www.massdrop.com/audiophile/drops"},
            {"name": "Amazon", "shortcutKey": "d", "url": "https://amazon.com"},
            {"name": "Olympic", "shortcutKey": "f", "url": "https://olympic.instructure.com/"},
            {"name": "Amazon", "shortcutKey": "z", "url": "https://amazon.com"},
            {"name": "Drive", "shortcutKey": "x", "url": "https://drive.google.com/drive/my-drive"}
        ]
    }
]

let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage(){
    let curHours = new Date().getHours();
    curHours = Math.floor(curHours/6); // Simply dividing current hours by 6 proves to be a good enough aproximation.
    if (curHours == 4) curHours = 3;
    let welcome = "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
    document.getElementById("welcome-string").innerHTML = welcome;
}

function setupGroups(){
    for (let i = 0; i < MASTER_MAP.length; i++){
        let curGroupData = MASTER_MAP[i];

        let group = document.createElement("div");
        group.className = "group";
        $container.appendChild(group);

        let header = document.createElement("h1");
        header.innerHTML = curGroupData.groupName;
        group.appendChild(header);

        for (let j = 0; j < curGroupData.items.length; j++){
            let curItemData = curGroupData.items[j];

            let pContainer = document.createElement("p");
            group.appendChild(pContainer);

            let link = document.createElement("a");
            link.innerHTML = curItemData.name;
            link.setAttribute("href", curItemData.url);
            pContainer.appendChild(link);

            let shortcutDisplay = document.createElement("span");
            shortcutDisplay.innerHTML = curItemData.shortcutKey;
            shortcutDisplay.className = "shortcut";
            shortcutDisplay.style.animation = "none";
            pContainer.appendChild(shortcutDisplay);

            getUrl[curItemData.shortcutKey] = curItemData.url
        }
    }
}

function shortcutListener(e) {
    let key = e.key.toLowerCase();

    if (listeningForShortcut && getUrl.hasOwnProperty(key)){
        window.location = getUrl[key];
    }

    if (key === SHORTCUT_STARTER) {
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        // Animation reset
        for (let i = 0; i < $shortcutDisplayList.length; i++){
            $shortcutDisplayList[i].style.animation = "none";
            setTimeout(function() { $shortcutDisplayList[i].style.animation = ''; }, 10);
        }

        listenerTimeout = setTimeout(function(){ listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}

function main(){
    setupWelcomeMessage();
    setupGroups();
    document.addEventListener('keyup', shortcutListener, false);
}

main();
