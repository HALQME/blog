let button = document.getElementById("mobile-menu-button");
let menu = document.getElementById("mobile-menu");
let isOpen = false;

function setupEventListeners() {
    button?.addEventListener("click", toggleMenu);

    menu?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            link.addEventListener("astro:after-swap", () => {
                if (isOpen) toggleMenu();
            });
        });
    });
}

document.addEventListener("astro:after-swap", () => {
    button = document.getElementById("mobile-menu-button");
    menu = document.getElementById("mobile-menu");
    isOpen = false;
    setupEventListeners();
});

function toggleMenu() {
    isOpen = !isOpen;

    if (menu) {
        if (isOpen) {
            menu.classList.remove("hidden");
            menu.classList.remove("translate-x-full");
        } else {
            menu.classList.add("translate-x-full");
            menu.classList.add("hidden");
        }

        // inert属性の制御
        if (isOpen) {
            menu.removeAttribute("inert");
        } else {
            menu.setAttribute("inert", "");
        }
    }

    if (button) {
        button.setAttribute("aria-expanded", String(isOpen));
        const icon = button.querySelector(".mobile-menu-icon");
        if (icon) {
            if (isOpen) {
                button.setAttribute("aria-label", "メニューを閉じる");
                icon.setAttribute("d", "M6 18L18 6M6 6l12 12");
            } else {
                button.setAttribute("aria-label", "メニューを開く");
                icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
            }
        }
    }
}

setupEventListeners();

// ESCキーでメニューを閉じる
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) toggleMenu();
});
