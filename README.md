# lokal-map-style

MapLibre GL style for the [Lokal](https://lokal.app) mobile app.

- **Current style** : [`lokal-light-minimal.json`](./lokal-light-minimal.json) — variant **C "Sable contrasté"** (light minimal, conventional white roads on warm sand background, miel casing on highways).
- **Archived variant** : [`_archive/lokal-bois-terracotta-variant-b.json`](./_archive/lokal-bois-terracotta-variant-b.json) — variant **B "Bois & terracotta"**, kept as instant rollback fallback.
- **Served by** : Cloudflare Pages → `https://lokal-map-style.pages.dev/lokal-light-minimal.json`
- **Tile source** : [OpenFreeMap](https://openfreemap.org/) (`https://tiles.openfreemap.org/planet`) — free, no API key required, OpenMapTiles schema.
- **Glyphs** : Noto Sans Regular & Bold, served by OpenFreeMap.

## Workflow — editing the style

1. Open [Maputnik OSS](https://maputnik.github.io/editor/)
2. **File → Open from URL** → `https://lokal-map-style.pages.dev/lokal-light-minimal.json`
3. Edit colors / layers / expressions in the UI
4. **File → Save → Download** (JSON)
5. Replace `lokal-light-minimal.json` in this repo on a feature branch
6. PR → review → merge to `main`
7. Cloudflare Pages auto-deploys in ~30 s
8. Mobile app picks up the new style on next open (no rebuild needed)

## Rollback procedure (C → B)

If variant C must be rolled back to variant B:

1. `git checkout -b rollback-to-b`
2. `cp _archive/lokal-bois-terracotta-variant-b.json lokal-light-minimal.json`
3. PR + merge → Cloudflare auto-deploys
4. **No mobile app rebuild needed.** Total rollback time: ~5 min.

## Decision log

| Date | Decision | Reference |
|------|----------|-----------|
| 2026-05-03 | Variant C "Sable contrasté" retained as production style. Variant B "Bois & terracotta" archived as rollback fallback. | `LOKAL-DEV-BRIEF.md` §11 |

## License

[MIT](./LICENSE) — free to fork, adapt, and reuse.
