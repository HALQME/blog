const button = document.getElementById("mobile-menu-button");
const menu = document.getElementById("mobile-menu");
let isOpen = false;

function toggleMenu() {
    isOpen = !isOpen;
    button?.setAttribute("aria-expanded", String(isOpen));
    menu?.classList.toggle("translate-x-full", !isOpen);

    // inert属性の制御
    if (menu) {
        if (isOpen) {
            menu.removeAttribute("inert");
        } else {
            menu.setAttribute("inert", "");
        }
    }

    if (button) {
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

button?.addEventListener("click", toggleMenu);

// メニュー内のリンクをクリックした時にメニューを閉じる
menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        if (isOpen) toggleMenu();
    });
});

// ESCキーでメニューを閉じる
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) toggleMenu();
});
