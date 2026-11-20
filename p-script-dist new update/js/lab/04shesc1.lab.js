(function () {
    function lockKeyboard() {
        if (navigator.keyboard && navigator.keyboard.lock) {
            navigator.keyboard.lock().catch(function (error) {
                console.log("[lab-keyboard] lock rejected:", error && error.name);
            });
        }
    }

    document.addEventListener("fullscreenchange", function () {
        if (document.fullscreenElement) {
            lockKeyboard();
        }
    });

    document.onkeydown = function () {
        return false;
    };
})();
