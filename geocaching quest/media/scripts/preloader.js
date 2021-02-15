let minimum_preload_time = 1000;
document.body.onload = function () {
    setTimeout(function () {
        let preloader = document.getElementsByClassName("preloader")[0];
        if (!preloader.classList.contains("preloaderCompleted")) {
            preloader.classList.add("preloaderCompleted")
        }
    }, minimum_preload_time);
};