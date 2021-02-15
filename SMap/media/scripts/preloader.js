document.body.onload = function () {
    setTimeout(function () {
        var preloader = document.getElementsByClassName('workingPreloader')[0];
        preloader.setAttribute('class', 'workingPreloader notWorkingPreloader');
        setTimeout(function () {
            preloader.setAttribute('class', 'notWorkingPreloader');
        }, 1000);
    }, 1000);
}