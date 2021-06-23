const NAME = "Calvin";
const WELCOME_MESSAGE_TEMPLATE = ["morning", "morning", "afternoon", "evening"];

function setupWelcomeMessage(){
    let curHours = new Date().getHours();
    curHours = Math.floor(curHours/6); 
    // Simply dividing current hours by 6 proves to be a good enough aproximation.
    // 24:00 - 05:00 = morning
    // 06:00 - 11:00 = morning
    // 12:00 - 17:00 = afternoon
    // 18:00 - 24:00 = evening
    if (curHours == 4) curHours = 3;
    let welcome = "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
    document.getElementById("welcome-string").innerHTML = welcome;
}

function main(){
    setupWelcomeMessage();
}

main();
