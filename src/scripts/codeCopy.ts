// コードブロックにコピーボタンを追加するスクリプト

/// <reference types="astro" />

interface WindowWithCodeCopy extends Window {
  initCodeCopyButtons?: () => void;
}

interface CodeBlockCache {
  [key: string]: string;
}

const codeContentCache: CodeBlockCache = {};

function generateCodeId(): string {
  return `code-${Math.random().toString(36).substring(2, 9)}`;
}

function addCopyButton(codeBlock: HTMLElement): void {
  // すでに処理済みの場合はスキップ
  if (codeBlock.hasAttribute("data-has-copy-button")) return;
  codeBlock.setAttribute("data-has-copy-button", "true");

  const codeId = generateCodeId();
  codeBlock.dataset.codeId = codeId;

  // コード内容を取得してキャッシュ
  const codeElement = codeBlock.querySelector("code");
  if (codeElement) {
    codeContentCache[codeId] = codeElement.textContent || "";
  }

  // ラッパー作成
  const wrapper = document.createElement("div");
  // codeBlock（Astroの<pre>タグ）は通常ブロックレベルなので、それを覆うラッパーも同じ幅になるようにする
  wrapper.className = "code-block-wrapper relative group block w-full";
  wrapper.style.position = "relative";

  // preタグの外側の余白をラッパーに移す
  if (typeof window !== "undefined") {
    const cs = window.getComputedStyle(codeBlock);
    wrapper.style.marginTop = cs.marginTop;
    wrapper.style.marginBottom = cs.marginBottom;
    wrapper.style.marginLeft = cs.marginLeft;
    wrapper.style.marginRight = cs.marginRight;
    codeBlock.style.margin = "0";
  }

  // コピーボタン作成
  const button = document.createElement("button");
  button.type = "button";
  button.className =
    "code-copy-button absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-black/80 dark:bg-white/20 backdrop-blur-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black dark:hover:bg-white/30 z-10";
  button.setAttribute("data-code-id", codeId);
  button.setAttribute("aria-label", "コードをコピー");
  button.innerHTML = `
    <span class="i-lucide:copy w-3.5 h-3.5"></span>
    <span class="copy-text">コピー</span>
  `;

  // クリックイベント
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const targetButton = e.currentTarget as HTMLButtonElement;
    const targetCodeId = targetButton.getAttribute("data-code-id");
    if (!targetCodeId) return;

    const codeText = codeContentCache[targetCodeId];
    if (!codeText) return;

    try {
      await navigator.clipboard.writeText(codeText);

      // 成功状態を表示
      const originalContent = targetButton.innerHTML;

      targetButton.innerHTML = `
        <span class="i-lucide:check w-3.5 h-3.5 text-green-400"></span>
        <span class="copy-text text-green-400">コピー済</span>
      `;
      targetButton.classList.add("bg-green-900/80");

      setTimeout(() => {
        targetButton.innerHTML = originalContent;
        targetButton.classList.remove("bg-green-900/80");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
      const copyText = targetButton.querySelector(".copy-text");
      if (copyText) {
        copyText.textContent = "失敗";
        setTimeout(() => {
          copyText.textContent = "コピー";
        }, 2000);
      }
    }
  });

  // コードブロックをラッパーで囲む
  codeBlock.parentNode?.insertBefore(wrapper, codeBlock);
  wrapper.appendChild(codeBlock);
  wrapper.appendChild(button);
}

// 既存のコードブロックに適用
function initCodeCopyButtons(): void {
  const codeBlocks = document.querySelectorAll<HTMLElement>(".astro-code");
  codeBlocks.forEach(addCopyButton);
}

// DOMが読み込まれたら実行
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCodeCopyButtons);
} else {
  initCodeCopyButtons();
}

// 動的に追加される要素にも適用（MutationObserver）
const codeObserver = new MutationObserver((mutations) => {
  let shouldInit = false;
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        if (element.classList?.contains("astro-code") || element.querySelector?.(".astro-code")) {
          shouldInit = true;
        }
      }
    });
  });
  if (shouldInit) {
    initCodeCopyButtons();
  }
});

codeObserver.observe(document.body, { childList: true, subtree: true });

// グローバルに公開
const codeWin = window as WindowWithCodeCopy;
codeWin.initCodeCopyButtons = initCodeCopyButtons;
