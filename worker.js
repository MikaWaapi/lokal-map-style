/**
 * Cloudflare Worker — Lokal MapLibre style server.
 *
 * Serves the static MapLibre GL style JSON files from the repo root via the
 * ASSETS binding (configured in wrangler.jsonc). All responses get permissive
 * CORS headers because MapLibre fetches the style cross-origin from the mobile
 * app (custom URL scheme on iOS/Android).
 */
export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    // Clone to make headers mutable.
    const headers = new Headers(response.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    headers.set("Cache-Control", "public, max-age=300, s-maxage=300");

    // Force application/json on .json paths (some CDNs strip it).
    const url = new URL(request.url);
    if (url.pathname.endsWith(".json")) {
      headers.set("Content-Type", "application/json; charset=utf-8");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
