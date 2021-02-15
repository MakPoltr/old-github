//Этот кусок кода выделен в отдельный файл по причине своей важности! Данный код решает проблему со 100vh в мобильных браузерах.
//------------------------------
function height100Vh(yourElement, indents, styleName) {
	if (window.screen.availWidth < 992) {
		document.getElementById(yourElement).style.cssText = styleName + ": " + (window.innerHeight - indents) + 'px';
	}
}
//------------------------------
height100Vh("particlesJs", 120, "height");
height100Vh("bodyInTextBook", 0, "min-height");