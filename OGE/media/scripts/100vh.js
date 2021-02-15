function height100Vh(yourElement, indents, styleName) {
    if (window.screen.availWidth < 992) {
        document.getElementById(yourElement).style.cssText = styleName + ": " + (window.innerHeight - indents) + 'px';
    }
}
//------------------------------
height100Vh("content", 140, "height")