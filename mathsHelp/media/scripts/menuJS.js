var menuButton = document.getElementById("menuButton");
var counter = true;
new Image().src = "https://" + location.hostname + "/mathsHelp/media/images/SVG/cancel.svg";
menuButton.onclick = function () {
	if (counter == true) {
		this.src = "https://" + location.hostname + "/mathsHelp/media/images/SVG/cancel.svg"; //убрать /mathsHelp при заливе на сервер
		this.className = "cancel"
		document.getElementById("navClosed").setAttribute("id", "navOpen");
		counter = false;
	}
	else {
		this.src = "https://" + location.hostname + "/mathsHelp/media/images/SVG/menuButton.svg"; //убрать /mathsHelp при заливе на сервер
		this.className = "burger";
		document.getElementById("navOpen").setAttribute("id", "navClosed");
		counter = true;
	}
};