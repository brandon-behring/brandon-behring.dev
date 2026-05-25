# Deploy Verification Session Log (2026-05-24)

Post-deploy audit of commit `9a6c788` — *feat: Phase 2 homepage redesign + Phase 3 first lab demo (RL citation graph)*. Read-only verification of `https://brandon-behring.dev` and the `brandon-behring.brandon-m-behring.workers.dev` preview, plus this log. No code changes.

Audit driven by `~/.claude/plans/what-s-now-live-quiet-ripple.md`. Tooling: `gh`, `curl`, Playwright MCP.

## Verdict

**PASS — shipped, live, with two non-blocking regressions to follow up.**

| Layer | Result |
|---|---|
| GitHub Actions run | ✅ success, 37s, head_sha `9a6c788`, [run #26365962766](https://github.com/brandon-behring/brandon-behring.dev/actions/runs/26365962766) |
| Static pages (2 hosts × 3 paths) | ✅ 6/6 — HTTP 200 + expected titles |
| Lab page DOM (both hosts) | ✅ title matches, "Sections (18)" filter present, Cytoscape `<application>` element renders |
| Lab page console (both hosts) | ⚠️ 3 errors / 175 warnings — see below |
| Cache / CDN | ✅ `cf-cache-status: HIT`, CF EWR PoP, no anomalies |

## 1 — GitHub Actions

Most recent `deploy.yml` run for `main`:

- Run: `26365962766` — <https://github.com/brandon-behring/brandon-behring.dev/actions/runs/26365962766>
- Triggered by push of `9a6c788`. Duration 37s. Conclusion `success`.
- Annotation surfaced: Node.js 20 actions deprecation warning (`actions/checkout@v4`, `actions/setup-node@v4`, `cloudflare/wrangler-action@v3`). Node 20 forced to Node 24 by 2026-06-02. **Follow-up belongs in `deploy-workflows` repo**, not here.

## 2 — Static page matrix (curl + grep)

All 6 cells PASS — HTTP 200 + expected `<title>`. Production and Workers.dev preview return byte-identical bodies for `/`.

| Host \ Path | `/` | `/work/` | `/work/causal-methods/` |
|---|---|---|---|
| `brandon-behring.dev` | ✅ 200 — *Brandon Behring — Applied Causal Methods + AI Evaluation* | ✅ 200 — *Work — Brandon Behring* | ✅ 200 — *Causal Methods — Brandon Behring* |
| `brandon-behring.brandon-m-behring.workers.dev` | ✅ 200 — same | ✅ 200 — same | ✅ 200 — same |

Homepage cluster-card text confirmed: `Causal Methods` (×5), `AI Evaluation` (×5), `Course Notes` (×2).

## 3 — Lab page (Playwright, both hosts)

`/lab/research-graph/` loads on both hosts. Title matches:

```
RL + Control Citation Graph — Brandon Behring
```

Accessibility-tree highlights (identical on both hosts):
- Page banner with `Brandon Behring` / `← Home` links.
- `<group>` named **"Sections (18)"** — matches the 18 thematic sections in `src/data/rl_citation_graph.json`.
- `Section filter` group + `Search paper titles` searchbox.
- `<application>` named **"Citation graph (interactive)"** — the Cytoscape canvas.

Screenshots (ephemeral, reproducible by re-running the audit):
- `/tmp/lab-research-graph--prod.png` (93 KB)
- `/tmp/lab-research-graph--workersdev.png` (89 KB)

### Console — errors (3, both hosts)

| # | Severity | Message | Known? |
|---|---|---|---|
| E1 | error | `Access to XMLHttpRequest at 'https://cloudflareinsights.com/cdn-cgi/rum' from origin '<host>' has been blocked by CORS policy` | **Known** — caused by `TOKEN_PLACEHOLDER` in `src/layouts/Base.astro` (`data-cf-beacon`). Tracked in `public/ASSETS-NEEDED.md`. |
| E2 | error | `Failed to load resource: net::ERR_FAILED @ https://cloudflareinsights.com/cdn-cgi/rum` | **Known** — companion to E1, same root cause. |
| E3 | error | `Failed to load resource: the server responded with a status of 404 () @ /favicon.svg` | **New regression** — no `public/favicon.*` file exists in the repo, but the layout references `/favicon.svg`. See follow-up F1. |

### Console — warnings (175, both hosts)

Two patterns, both from the Cytoscape island bundle `_astro/CitationGraph.astro_astro_type_script_index_0_lang.C7z-VVPJ.js`:

1. **Custom wheel sensitivity warning** (×1). Cosmetic Cytoscape config noise. Ignore.
2. **`hsl()` color rejection** (×~174, two messages per node, sometimes repeated on hover/redraw):

   ```
   The style property `background-color: hsl(140 60% 55%)` is invalid
   Custom function mappers may not return invalid values for the property type
     (i.e. `background-color` for ele `source:arxiv:<arxiv_id>` is invalid)
   ```

   **New cosmetic regression**: the per-node color function returns CSS `hsl(H S% L%)` strings, but Cytoscape's style API rejects `hsl()` syntax — it accepts hex (`#rrggbb`) or `rgb(...)`. Result: nodes likely render in the default Cytoscape color, **the intended per-domain hues are silently dropped**. The graph is still interactive; only the visual encoding is degraded. See follow-up F2.

## 4 — Cache / CDN sanity

Both hosts, `/lab/research-graph/`:

```
cache-control: public, max-age=0, must-revalidate
cf-cache-status: HIT
cf-ray: a00de66*-EWR
content-type: text/html
server: cloudflare
```

Behaves normally. EWR PoP. `HIT` is expected — the post-deploy first request already populated the edge cache, and the audit ran after the rest of the verification, so further requests get a HIT. `must-revalidate` + `max-age=0` is the right shape for static HTML.

## Follow-ups (new, not previously tracked)

| ID | Severity | Description |
|---|---|---|
| F1 | low | `/favicon.svg` returns 404 on both hosts. `public/` has no favicon. Either add `public/favicon.svg` (or `favicon.ico` + matching layout reference) or remove the `<link rel="icon">` from `src/layouts/Base.astro`. |
| F2 | medium | `CitationGraph.astro` uses `hsl(H S% L%)` for per-domain node coloring; Cytoscape rejects all ~84 node colors. Switch the color function to return hex (or `rgb(...)`) so the intended thematic coloring actually renders. Currently the visual encoding is silently degraded. |

Pre-existing follow-ups (still tracked in `public/ASSETS-NEEDED.md`, not regressions):

- Replace `TOKEN_PLACEHOLDER` in `Base.astro` with the real Cloudflare Web Analytics token (eliminates E1/E2).
- Generate the 1200×630 OG image PNG.
- Capture per-project screenshots for the cluster pages.
- Edge density in `rl_citation_graph.json` is 3 edges across 84 nodes; pending A4 enrichment with classic-books / pre-arxiv ingestion.

## Next-session opener

Per `docs/roadmap.md`, the "Next 1–3" stack is unchanged:

1. **A4 enrichment** — densify the citation graph by adding pre-arxiv classics (Bellman, Bertsekas, Kalman) + textbooks to research-kb. Naturally pairs with **F2 fix** since that pass touches the same component.
2. **Polish assets** — F1 + the Web Analytics token + OG image + screenshots are all small, batchable wins.
3. **B1** — migrate `post_transformers/guides/web` to the reusable workflow.

F1 + the Web Analytics token together would clear all 3 console errors on the lab page — quick high-leverage cleanup.

## Reproducing this audit

Plan file: `~/.claude/plans/what-s-now-live-quiet-ripple.md`. Steps in order:

1. `gh run list --workflow=deploy.yml --limit 5 --repo brandon-behring/brandon-behring.dev`
2. For `HOST ∈ {brandon-behring.dev, brandon-behring.brandon-m-behring.workers.dev}` and `PATH ∈ {/, /work/, /work/causal-methods/}` — `curl -sS -o /tmp/page.html -w '%{http_code}' "https://${HOST}${PATH}"` + grep title.
3. Playwright MCP: `browser_navigate` → `browser_console_messages level=error` → `browser_snapshot` → `browser_take_screenshot` for each host's `/lab/research-graph/`.
4. `curl -sSI "https://brandon-behring.dev/lab/research-graph/" | grep -iE '^(cf-|cache-control|content-type|server):'`
