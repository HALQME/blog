class AstroTabs extends HTMLElement {
    private tabLinks: HTMLAnchorElement[];
    private panels: HTMLElement[];
    private tabGroupId: string;
    private defaultTabClasses = [
        "text-gray-300",
        "hover:text-gray-500",
        "border-transparent",
        "hover:border-gray-200",
        "dark:text-gray-600",
        "dark:hover:text-gray-500",
        "dark:border-transparent",
        "dark:hover:border-gray-700",
    ];
    private activeTabClasses = [
        "text-gray-700",
        "hover:text-gray-800",
        "border-blue-300",
        "dark:text-gray-200",
        "dark:hover:text-gray-100",
        "dark:border-blue-600",
    ];

    constructor() {
        super();
        this.clearSearchParams();
        this.tabGroupId = this.getAttribute("id")
            ? "-" + this.getAttribute("id")
            : "";
        this.tabLinks = Array.from(
            this.querySelectorAll(".tab-button")
        ) as HTMLAnchorElement[];
        this.panels = Array.from(this.querySelectorAll(".panel"));
        this.init();
    }

    private init() {
        // タブクリックイベントの設定
        this.tabLinks.forEach((tabLink, index) => {
            tabLink.addEventListener("click", (event) => {
                event.preventDefault();
                this.activateTab(index);
            });
        });

        // 常に最初のタブをアクティブにする
        this.activateTab(0, false);

        // popstateイベントのリスナー
        window.addEventListener("popstate", () => {
            const index = this.getTabIndexFromSearchParams();
            if (index !== null) {
                this.activateTab(index, false);
            }
        });
    }

    private getTabIndexFromSearchParams(): number | null {
        const params = new URLSearchParams(window.location.search);
        const activeTabId = params.get(`tab${this.tabGroupId}`);
        if (activeTabId) {
            const tabIndex = this.tabLinks.findIndex(
                (tab) => tab.getAttribute("data-tab-id") === activeTabId
            );
            if (tabIndex !== -1) {
                return tabIndex;
            }
        }
        return null;
    }

    private activateTab(index: number, updateHistory = true) {
        // クラスリストの変更を一括で行う
        this.tabLinks.forEach((tabLink, i) => {
            const isActive = i === index;
            tabLink.setAttribute("aria-selected", isActive.toString());
            tabLink.classList.remove(
                ...(isActive ? this.defaultTabClasses : this.activeTabClasses)
            );
            tabLink.classList.add(
                ...(isActive ? this.activeTabClasses : this.defaultTabClasses)
            );
        });

        // パネルの表示/非表示を一括で切り替え
        this.panels.forEach((panel, i) => {
            panel.classList.toggle("hidden", i !== index);
            panel.classList.toggle("block", i === index);
        });

        if (updateHistory) {
            const params = new URLSearchParams(window.location.search);
            const activeTabId =
                this.tabLinks[index].getAttribute("data-tab-id");
            params.set(
                `tab${this.tabGroupId}`,
                activeTabId || index.toString()
            );
            const newUrl = `${window.location.pathname}?${params.toString()}${
                window.location.hash
            }`;
            window.history.replaceState({}, "", newUrl);
        }
    }

    private clearSearchParams() {
        const newUrl = `${window.location.pathname}`;
        window.history.replaceState({}, "", newUrl);
    }
}

customElements.define("astro-tabs", AstroTabs);
