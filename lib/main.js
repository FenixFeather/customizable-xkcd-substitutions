// My FF addon
// @author Thomas Liu

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;
var prefs = require("sdk/simple-prefs").prefs;

var button = buttons.ActionButton({
    id: "mozilla-link",
    label: "Visit Mozilla",
    icon: {
	"16": "./icon-16.png",
	"32": "./icon-32.png",
	"64": "./icon-64.png"
    },
    onClick: handleClick
});

function handleClick(state) {
    // tabs.open("http://www.mozilla.org/");
    prefs.enable = !prefs.enable;
}

pageMod.PageMod({
    include: "*",
    contentScriptFile: data.url("script.js"),
    onAttach: function(worker) {
	if (prefs.enable) {
	    worker.port.emit("replacements_update", prefs.replacements);
	    console.log(prefs.replacements);
	}
    }
});

function onPrefChange(prefName) {
    console.log("The " + prefName + " preference changed.");
}
require("sdk/simple-prefs").on("", onPrefChange);
