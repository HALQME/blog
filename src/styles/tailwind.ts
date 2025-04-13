export const styles = {
    // 共通レイアウト
    layout: {
        container: "mx-auto px-4 max-w-6xl",
        section: "py-6 mx-auto px-4",
        sectionIndex: "py-6 max-w-4xl mx-auto px-4",
        sectionPage: "max-w-6xl mx-auto px-4",
    },

    // テキスト
    text: {
        heading: {
            h1: "text-4xl font-bold mb-8 text-gray-900 dark:text-white",
            h2: "text-3xl font-bold text-gray-900 dark:text-white my-4",
            h3: "text-2xl font-bold text-gray-900 dark:text-white",
        },
        body: {
            normal: "text-gray-800 dark:text-gray-200 leading-relaxed",
            muted: "text-gray-600 dark:text-gray-400",
            small: "text-sm",
        },
        link: {
            default: "text-blue-600 dark:text-blue-400 hover:underline",
            nav: "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800",
            accent: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors",
        },
    },

    // コンポーネント
    components: {
        card: {
            container:
                "relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02]",
            wrapper: "group mb-12",
            content: "mt-4",
        },
        button: {
            primary:
                "inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors",
            secondary:
                "inline-flex items-center px-6 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors",
            pagination:
                "px-3 py-2 rounded-lg text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30",
            active: "px-3 py-2 rounded-lg text-sm bg-blue-600 text-white",
            disabled: "px-3 py-2 text-sm text-gray-600",
        },
        tag: {
            default: "inline-flex items-center px-3 py-1 rounded-full text-sm",
            blue: "inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors",
        },
    },

    // グリッドとフレックス
    grid: {
        blog: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        projects: "grid grid-cols-1 sm:grid-cols-2 gap-8",
        twoColumn: "grid grid-cols-1 sm:grid-cols-2",
        default: "grid",
    },

    flex: {
        center: "flex justify-center items-center",
        between: "flex justify-between items-center",
        column: "flex flex-col",
        row: "flex flex-row",
        wrap: "flex flex-wrap",
        gap: {
            sm: "gap-2",
            md: "gap-4",
            lg: "gap-8",
        },
    },

    // ヘッダーとフッター
    header: {
        nav: "bg-transparent fixed w-full top-0 z-50 left-0 right-0",
        container:
            "w-full mx-auto px-6 py-3 backdrop-blur-lg bg-white/60 dark:bg-gray-900/60",
    },

    footer: {
        container:
            "bg-gray-200 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800 mt-auto",
        content: "container mx-auto px-4 py-8",
    },

    // ユーティリティ
    utils: {
        prose: "prose dark:prose-invert prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-800 dark:hover:prose-a:text-blue-300 max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-p:leading-7 prose-li:leading-7 prose-img:rounded-lg prose-pre:bg-gray-800 dark:prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-lg",
        aspectRatio: {
            video: "aspect-w-16 aspect-h-9",
            wide: "aspect-w-21 aspect-h-9",
        },
    },

    // ページネーション
    pagination: {
        container: "flex justify-center items-center gap-2 mt-8",
    },
};
