document.body.onload = function () {
	setTimeout(function () {
		var preloader = document.getElementById('preloader');
		preloader.style.opacity = "0";
		preloader.style.visibility = "hidden";
	}, 1000);
}