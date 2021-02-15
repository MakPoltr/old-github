let content_sections = document.getElementsByTagName("main")[0].children
    , cubes = document.getElementsByClassName("headerCube")
    , navigation = document.getElementsByClassName("navigation")[0]
    , navigation_items = navigation.children
    , buttons_back = document.getElementsByClassName("back");
navigation.onclick = function (event) {
    let target = event.target;
    navigation.classList.add('nonClickableNavigation');
    setTimeout(function () {
        cubes[0].classList.add("blueCubeToTheLeft");
        cubes[1].classList.add("redCubeToTheRight");
        navigation_items[0].classList.add("navigationMovesToTheTop");
        navigation_items[1].classList.add("navigationMovesToTheTop");
        setTimeout(function () {
            if (target.classList.contains("navigationWho")) {
                content_sections[0].classList.add('active');
            }
            else {
                content_sections[1].classList.add('active');
            }
        }, 250);
    }, 750);
};

function backToNavigation() {
    setTimeout(function () {
        cubes[0].classList.remove("blueCubeToTheLeft");
        cubes[1].classList.remove("redCubeToTheRight");
        navigation_items[0].classList.add("navigationMovesToTheBottom");
        navigation_items[1].classList.add("navigationMovesToTheBottom");
        navigation_items[0].classList.remove("navigationMovesToTheTop");
        navigation_items[1].classList.remove("navigationMovesToTheTop");
        setTimeout(function () {
            navigation_items[0].classList.remove("navigationMovesToTheBottom");
            navigation_items[1].classList.remove("navigationMovesToTheBottom");
            navigation.classList.remove('nonClickableNavigation');
        }, 750);
    }, 250);
};
buttons_back[0].onclick = function () {
    content_sections[0].classList.remove('active');
    backToNavigation();
};
buttons_back[1].onclick = function () {
    content_sections[1].classList.remove('active');
    backToNavigation();
};