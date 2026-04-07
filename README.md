# Blog

Astroベースの個人ブログ。

## 技術スタック

- **Astro** - 静的サイト生成
- **UnoCSS** - CSSフレームワーク
- **MDX** - マークダウン + JSX
- **Bun** - パッケージマネージャー
- **Typst** - CV PDF生成
- **Cloudflare Pages** - デプロイ先

## セットアップ

```bash
# 開発シェル起動（必須）
nix develop

# 依存関係インストール
bun install
```

## コマンド

```bash
bun run dev      # 開発サーバー起動
bun run build    # 本番ビルド（CV含む）
bun run preview  # プレビュー表示
bun run format   # フォーマット
bun run lint     # リント
```

## CV

CVは `public/cv.typ` で管理され、ビルド時にPDFとして出力されます。

## 構成

```
src/
├── components/  # UIコンポーネント
├── content/     # ブログ記事・CV
├── layouts/     # レイアウト
└── pages/       # ページ
```
