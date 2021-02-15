var counter = 1;
        var menuButton = document.getElementById("menu");
        var navForPhones = document.getElementById("navForPhones");

        function menu() {
            counter += 1;
            if ((counter % 2) == 0) {
                menuButton.setAttribute("src", "image/cross.png");
                navForPhones.style.display = "block";
            }
            else {
                menuButton.setAttribute("src", "image/burger.png");
                navForPhones.style.display = "none";
            }
        }