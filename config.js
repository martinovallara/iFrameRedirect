const settings = require('./settings.json');

const mixedSteps = {

    "gdiURL": settings.gdiURL,
    "authURL": settings.authURL,
    "authNotifyURL": settings.authNotifyURL,
    "initURL": settings.mixedSteps.initURL,
    "gdiNotifyURL": settings.mixedSteps.gdiNotifyURL
}

const twoSteps = {

    "gdiURL": settings.gdiURL,
    "authURL": settings.authURL,
    "authNotifyURL": settings.authNotifyURL,
    "initURL": settings.twoSteps.initURL,
    "gdiNotifyURL": settings.twoSteps.gdiNotifyURL
}

const urlSettings = {
    mixedSteps,
    twoSteps
};

function getUrlSettingsByArgv() {
    return process.argv.length > 2 ? urlSettings[process.argv[2]] : urlSettings['twoSteps'];
};

console.log("urlSettings choise: ");
console.log(urlSettings);
console.log("process.argv[2]: " + process.argv.length > 2 ? process.argv[2] : 'twoSteps');
console.log(getUrlSettingsByArgv());

module.exports = getUrlSettingsByArgv();