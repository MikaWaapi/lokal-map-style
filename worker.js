/**
 * Cloudflare Worker — Lokal MapLibre style server.
 *
 * Serves the static MapLibre GL style JSON files from the repo root via the
 * ASSETS binding (configured in wrangler.jsonc). All responses get permissive
 * CORS headers because MapLibre fetches the style cross-origin (mobile app
 * via custom URL scheme, Maputnik web editor for designer iteration).
 */
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Max-Age": "86400",
};

export default {
  async fetch(request, env) {
    // CORS preflight — required by browsers (Maputnik, web debug tools).
    // Mobile native MapLibre skips preflight, but answering 204 here is cheap.
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    for (const [k, v] of Object.entries(CORS_HEADERS)) headers.set(k, v);
    headers.set("Cache-Control", "public, max-age=300, s-maxage=300");

    if (new URL(request.url).pathname.endsWith(".json")) {
      headers.set("Content-Type", "application/json; charset=utf-8");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
