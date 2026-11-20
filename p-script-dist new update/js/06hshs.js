(function () {
    window.__06_STUB__ = true;
    window.myFunction = function () {
        return "Changes you made may not be saved.";
    };

    function hide(id) {
        var el = document.getElementById(id);
        if (el) {
            el.style.display = "none";
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".btn_leave").forEach(function (el) {
            el.addEventListener("click", function (event) {
                event.preventDefault();
                hide("exit-popup");
                console.log("[lab-06] leave clicked");
            });
        });

        document.querySelectorAll(".btn_cancel").forEach(function (el) {
            el.addEventListener("click", function (event) {
                event.preventDefault();
                hide("exit-popup");
                console.log("[lab-06] cancel clicked");
            });
        });

        document.querySelectorAll(".leave_page").forEach(function (el) {
            el.addEventListener("click", function (event) {
                event.preventDefault();
                hide("pop_up_new");
                console.log("[lab-06] popup action clicked:", el.textContent.trim());
            });
        });

        var close = document.getElementById("bgt");
        if (close) {
            close.addEventListener("click", function (event) {
                event.preventDefault();
                hide("poptxt");
                console.log("[lab-06] poptxt close clicked");
            });
        }

        document.querySelectorAll(".addtochromebutton").forEach(function (el) {
            el.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                console.log("[lab-06] action button:", el.textContent.trim());
            });
        });

        console.log("[lab-06] stub loaded");
    });
})();
