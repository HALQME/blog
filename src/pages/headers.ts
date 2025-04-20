export function GET(): Response {
    // nonceはサーバーサイドで動的に生成されるべきですが、Astroでは
    // ビルド時に処理されるため、プレースホルダーとして使用します
    const nonce = crypto.randomUUID();

    return new Response(
        `/*\n` +
            `    Strict-Transport-Security: max-age=31536000; includeSubDomains; preload\n` +
            `    X-Frame-Options: DENY\n` +
            `    X-Content-Type-Options: nosniff\n` +
            `    X-XSS-Protection: 1; mode=block\n` +
            `    BASE-URL: self\n` +
            `    Referrer-Policy: strict-origin-when-cross-origin\n` +
            `    Cross-Origin-Opener-Policy: same-origin\n` +
            `    Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic'; img-src 'self'; font-src 'self'; connect-src 'self'\n`
    );
}
