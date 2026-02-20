// 見出しにアンカーリンクを追加するスクリプト
interface WindowWithAnchorLinks extends Window {
  initAnchorLinks?: () => void;
}

function createAnchorIcon(): HTMLAnchorElement {
  const anchor = document.createElement("a");
  anchor.className =
    "anchor-link opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-light hover:text-primary";
  anchor.setAttribute("aria-label", "このセクションのリンクをコピー");
  anchor.href = "#";
  anchor.innerHTML = '<span class="i-lucide:link w-4 h-4 inline-block"></span>';
  return anchor;
}

function generateAnchorId(heading: HTMLHeadingElement): string {
  // 既存のidがある場合はそれを使用
  if (heading.id) return heading.id;

  // 見出しテキストからidを生成
  const text = heading.textContent?.trim() || "";
  const id = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 50);
  return id || "heading";
}

function initAnchorLinks(): void {
  // proseクラス内の見出しを取得
  const proseElements = document.querySelectorAll(".prose");

  proseElements.forEach((prose) => {
    const headings = prose.querySelectorAll<HTMLHeadingElement>("h2, h3, h4, h5, h6");

    headings.forEach((heading) => {
      // すでに処理済みかチェック
      if (heading.classList.contains("anchor-initialized")) return;
      heading.classList.add("anchor-initialized");

      // groupクラスを追加
      heading.classList.add("group", "cursor-pointer");

      // 見出しにidを設定
      const anchorId = generateAnchorId(heading);
      if (!heading.id) {
        heading.id = anchorId;
      }

      // アンカーアイコンを作成
      const anchor = createAnchorIcon();

      // クリックイベントを追加
      anchor.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const url = `${window.location.origin}${window.location.pathname}#${heading.id}`;

        try {
          await navigator.clipboard.writeText(url);

          // ビジュアルフィードバック
          const icon = anchor.querySelector("span");
          if (icon) {
            const originalIcon = icon.className;
            icon.className = "i-lucide:check w-4 h-4 inline-block text-green-500";

            setTimeout(() => {
              icon.className = originalIcon;
            }, 2000);
          }
        } catch (err) {
          console.error("Failed to copy anchor link:", err);
        }
      });

      // 見出し自体のクリックでもアンカーにスクロール
      heading.addEventListener("click", (e) => {
        if (e.target === anchor || anchor.contains(e.target as Node)) {
          return;
        }
        window.location.hash = heading.id;
      });

      // アンカーを見出しに追加
      heading.appendChild(anchor);
    });
  });
}

// DOMが読み込まれたら実行
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnchorLinks);
} else {
  initAnchorLinks();
}

// 動的に追加される要素にも適用（MutationObserver）
const anchorObserver = new MutationObserver((mutations) => {
  let shouldInit = false;
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        if (element.classList?.contains("prose") || element.querySelector?.(".prose")) {
          shouldInit = true;
        }
      }
    });
  });
  if (shouldInit) {
    initAnchorLinks();
  }
});

anchorObserver.observe(document.body, { childList: true, subtree: true });

// グローバルに公開
const anchorWin = window as WindowWithAnchorLinks;
anchorWin.initAnchorLinks = initAnchorLinks;
