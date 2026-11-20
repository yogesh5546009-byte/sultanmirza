(function () {
    window.LAB_UNLOAD_COUNT = 0;

    window.labWorkerTest = function (count) {
        var total = Math.max(1, Math.min(Number(count) || 4, 16));
        var script = "setInterval(function(){Math.random();},50);";
        var blob = new Blob([script], { type: "application/javascript" });
        var url = URL.createObjectURL(blob);
        var workers = [];

        for (var i = 0; i < total; i++) {
            try {
                workers.push(new Worker(url));
            } catch (error) {
                console.log("[lab-worker] create failed:", error && error.name);
                break;
            }
        }

        setTimeout(function () {
            workers.forEach(function (worker) {
                worker.terminate();
            });
            URL.revokeObjectURL(url);
            console.log("[lab-worker] terminated:", workers.length);
        }, 1000);

        return workers.length;
    };

    window.addEventListener("beforeunload", function () {
        window.LAB_UNLOAD_COUNT++;
        console.log("[lab-unload] beforeunload observed; count=" + window.LAB_UNLOAD_COUNT);
    });

    window.addEventListener("unload", function () {
        console.log("[lab-unload] unload observed; worker bomb suppressed");
    });
})();
