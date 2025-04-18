export function GET(): Response {
    return new Response(
        `/*\n` +
            `    Strict-Transport-Security: max-age=31536000; includeSubDomains; preload\n` +
            `    X-Frame-Options: DENY\n` +
            `    X-Content-Type-Options: nosniff\n` +
            `    X-XSS-Protection: 1; mode=block\n` +
            `    BASE-URL: self\n` +
            `    Referrer-Policy: strict-origin-when-cross-origin\n` +
            `    Cross-Origin-Opener-Policy: same-origin\n` +
            `    Content-Security-Policy: default-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; img-src 'self' https://www.google-analytics.com; font-src 'self'; connect-src 'self' https://www.google-analytics.com` +
            `    X-Frame-Options: SAMEORIGIN\n`
    );
}
