var mql = window.matchMedia("(orientation: portrait)");
const heightWindow = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
const widthWindow = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;

function heightAssignmentInVh(elementId, numberVh) {
    var element = document.getElementById(elementId);
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        function calculation100Vh(request) {
            if (request.matches) {
                element.style.height = heightWindow * numberVh / 100 + "px";
            }
            else {
                element.style.height = widthWindow * numberVh / 100 + "px";
            }
        }
        mql = window.matchMedia("(orientation: portrait)");
        mql.addListener(calculation100Vh);
        calculation100Vh(mql);
    }
    else {
        element.style.height = numberVh + "vh";
    }
}
heightAssignmentInVh("header", 100);