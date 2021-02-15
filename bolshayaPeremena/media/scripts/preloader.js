let minimum_preloader_time = 3000
document.body.onload = function () {
    setTimeout(function () {
        let preloader = document.getElementsByClassName('preloader')[0];
        if (!preloader.classList.contains('deactivated')) {
            preloader.classList.add('deactivated');
        }
    }, minimum_preloader_time);
}