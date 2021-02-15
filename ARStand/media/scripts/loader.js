document.body.onload = function () {
    setTimeout(function () {
        var loader = document.getElementsByClassName('workingLoader')[0];
        loader.setAttribute('class', 'workingLoader notWorkingLoader');
        setTimeout(function () {
            loader.setAttribute('class', 'notWorkingLoader');
        }, 1000);
    }, 1000);
}