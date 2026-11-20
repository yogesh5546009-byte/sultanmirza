(function () {
    var params = new URLSearchParams(window.location.search);
    var requested = (params.get("analytics") || "").toLowerCase();
    var mode = window.LAB.analyticsMode;

    if (requested === "live" || requested === "external") {
        mode = "live";
    } else if (requested === "local" || requested === "off") {
        mode = "local";
    }

    window.LAB.analyticsMode = mode;

    function localTrack(name, props) {
        var payload = {
            n: name,
            u: window.location.href,
            d: window.location.host,
            r: document.referrer || null,
            w: window.innerWidth,
            p: props || null,
            t: new Date().toISOString(),
            m: mode
        };
        if (window.LAB.localMirror !== false && window.LAB.events) {
            try {
                fetch(window.LAB.events, {
                    method: "POST",
                    headers: { "Content-Type": "text/plain" },
                    body: JSON.stringify(payload),
                    keepalive: true
                }).catch(function () {});
            } catch (e) {}
        }
        if (window.console && console.log) {
            console.log("[lab-track]", name, payload);
        }
    }

    function injectPublytics() {
        window.publytics = window.publytics || function () {
            (window.publytics.q = window.publytics.q || []).push(arguments);
        };
        var script = document.createElement("script");
        script.defer = true;
        script.src = window.LAB.publyticsScript;
        script.setAttribute("data-domain", window.LAB.publyticsDomain);
        document.head.appendChild(script);
    }

    function injectClarity() {
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () {
                (c[a].q = c[a].q || []).push(arguments);
            };
            t = l.createElement(r);
            t.async = 1;
            t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", window.LAB.clarityProject);
    }

    if (mode === "live") {
        injectPublytics();
        injectClarity();
        console.log("[lab-track] live analytics enabled", {
            publytics: window.LAB.publyticsDomain,
            clarity: window.LAB.clarityProject
        });
    }

    window.labTrack = function (name, props) {
        localTrack(name, props);
        if (mode === "live" && window.publytics) {
            try {
                window.publytics(name, props ? { props: props } : undefined);
            } catch (e) {}
        }
    };

    window.labTrack("pageview");
})();
