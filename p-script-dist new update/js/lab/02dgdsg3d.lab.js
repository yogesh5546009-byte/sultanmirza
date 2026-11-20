function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
}

$(document).ready(function () {
    var audio = document.createElement("audio");
    audio.setAttribute("src", window.LAB.audio);
    audio.addEventListener("ended", function () {
        this.play().catch(function () {});
    }, false);

    $(".map").click(function () {
        audio.play().catch(function () {});
    });
    $(".black").click(function () {
        audio.play().catch(function () {});
    });
    $("#footer").click(function () {
        audio.play().catch(function () {});
    });
});

$(document).ready(function () {
    $("body").mouseover(function () {
        $("#footer").fadeIn("").css({
            bottom: -20,
            position: "fixed"
        }).animate({
            bottom: -20
        }, 200, function () {});
    });
});

addEvent(document, "mouseout", function (event) {
    if (event.toElement == null && event.relatedTarget == null) {
        $(".lightbox").slideDown();
    }
});

$("body").click(function () {
    $(".lightbox").slideUp();
});
