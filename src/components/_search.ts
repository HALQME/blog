import { PagefindUI } from "@pagefind/default-ui";

function initializeSearch() {
    // 要素の取得
    const searchButton = document.getElementById("search-button");
    const searchModal = document.getElementById("search-modal");

    // すでに初期化されている場合は処理しない
    if (searchButton?.dataset.initialized === "true") {
        return;
    }

    // 検索UIの初期化
    if (document.getElementById("search")) {
        new PagefindUI({
            element: "#search",
            showImages: false,
            autofocus: true,
            pageSize: 10,
        });
    }

    // 検索ボタンクリックイベント
    searchButton?.addEventListener("click", () => {
        searchModal?.classList.add("is-active");
    });

    // 初期化フラグを設定
    if (searchButton) {
        searchButton.dataset.initialized = "true";
    }

    // モーダルの背景部分をクリックして閉じる
    searchModal?.addEventListener("click", (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove("is-active");
        }
    });
}

// グローバルのキーボードイベント（一度だけ設定）
function setupGlobalEvents() {
    // ESCキーを押して閉じる処理
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const modal = document.getElementById("search-modal");
            if (modal?.classList.contains("is-active")) {
                modal.classList.remove("is-active");
            }
        }
    });
}

setupGlobalEvents();

// ページ遷移後の再初期化
document.addEventListener("astro:page-load", initializeSearch, {
    once: false,
});
