# Portfolio Cloudflare deployment checklist

Cross-project state and remaining work for the three Cloudflare Workers Static Assets deployments in the portfolio:

- **`brandon-behring.dev`** — apex portfolio (LIVE)
- **`double_ml_time_series`** — DML book at `web/` subdir → `dml.brandon-behring.dev` (Phase 1 in flight)
- **`ssm-foundations`** — sibling academic book → `ssm-foundations.brandon-behring.dev` (Phase 1b, queued)

Each project has its own walkthrough doc with the per-project mechanics:
- `~/Claude/brandon-behring.dev/docs/cloudflare-setup.md` — original first-time setup
- `~/Claude/double_ml_time_series/web/docs/cloudflare-setup.md` — DML-specific 7-step walkthrough

This doc is the **status tracker** — what's done, what's pending, in what order.

---

## ✅ Done (do not redo)

### brandon-behring.dev (LIVE)

- [x] Cloudflare account created
- [x] `brandon-behring.dev` zone added; nameservers point to Cloudflare
- [x] API token created using the "Edit Cloudflare Workers" template, scoped to:
  - Account: your account (not "All accounts")
  - Zone: `brandon-behring.dev` only
- [x] `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` set as **repo secrets in `brandon-behring/brandon-behring.dev`**
- [x] Worker `brandon-behring` deployed via Workers Static Assets
- [x] Apex domain `brandon-behring.dev` bound to the Worker in the dashboard
- [x] `wrangler.jsonc` (with `$schema`), `output: 'static'`, local `deploy`/`dev:cf` scripts — all canonical pattern

### Phase 1d — reusable-workflow pinning (2026-05-26)

All 3 live consumers pinned from `deploy-workflows@main` → `@v1`:

| Repo | Workflow file | Phase 1d commit |
|---|---|---|
| `brandon-behring.dev` | `.github/workflows/deploy.yml` | `c46d946` |
| `double_ml_time_series` | `.github/workflows/deploy-web.yml` (production job) | `41efdac` |
| `ssm-foundations` | `.github/workflows/deploy.yml` | `ac237f8` |

Tag scheme on `brandon-behring/deploy-workflows` (at `0349ddc`):
- `v1.0.0` — annotated immutable point-in-time tag (carries release notes)
- `v1` — lightweight moveable major-line pointer (force-move on patch)

Convention follows `actions/checkout@v4` / `cloudflare/wrangler-action@v3`.
Future patches: force-move `v1`; consumers auto-pick-up on next CI.
Bisection: pin a consumer temporarily to `@v1.0.0` to isolate a patch.

### Reusable assets (carry over to new projects)

These are **account-wide** — you do not create them again per project:

| Asset | Reuse for new projects? | How |
|---|---|---|
| Cloudflare account | yes | already exists |
| `brandon-behring.dev` zone | yes | covers all `*.brandon-behring.dev` subdomains automatically |
| Account ID | yes | one value, copy into each new repo's secrets |
| API token | yes (same scope works) | one token can cover all Workers in your account + the `brandon-behring.dev` zone |
| Cloudflare ↔ GitHub OAuth connection | yes (account-level, already authorized) | n/a |

---

## ⏳ Pending (DML — Phase 1)

Do these in order. Each step is gated on the previous one.

### 1. Confirm `brandon-behring/deploy-workflows#1` has merged

```bash
gh pr view 1 --repo brandon-behring/deploy-workflows --json state,mergedAt
# Expect: { "state": "MERGED", "mergedAt": "..." }
```

If still open: review and merge.

### 2. Set the two repo secrets for `double_ml_time_series`

Same values as brandon-behring.dev — copy them.

```bash
# Account ID — same value as the brandon-behring.dev secret
gh secret set CLOUDFLARE_ACCOUNT_ID --repo brandon-behring/double_ml_time_series
# Paste the same Account ID at the prompt.

# API token — same scope works (Workers Scripts:Edit + Account:Read + Zone:brandon-behring.dev)
gh secret set CLOUDFLARE_API_TOKEN --repo brandon-behring/double_ml_time_series
# Paste the existing token, OR generate a new one with the same scope.
```

Verify:

```bash
gh secret list --repo brandon-behring/double_ml_time_series
# Should show both: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID
```

> **If you lost the API token from the brandon-behring.dev setup**: create a new one (Cloudflare dashboard → My Profile → API Tokens → Create Token → "Edit Cloudflare Workers" template → scope to your account + `brandon-behring.dev` zone). The token is a *capability*, not an *identity* — multiple tokens with the same scope are fine. You can revoke the old one later if you want a single source.

### 3. Push DML to `main`

```bash
cd /home/brandon_behring/Claude/double_ml_time_series
git push origin main           # 10 unpushed commits
gh run watch
```

Expected outcome: workflow completes, site lands at `https://brandon-behring-double-ml-time-series.brandon-m-behring.workers.dev` (Pass 1 workers.dev URL).

### 4. Bind `dml.brandon-behring.dev` custom domain

Dashboard-only:

1. Cloudflare dashboard → **Workers & Pages**
2. Click the Worker **`brandon-behring-double-ml-time-series`**
3. **Settings** → **Domains & Routes** → **Add → Custom Domain**
4. Enter `dml.brandon-behring.dev`
5. Confirm — Cloudflare auto-creates the CNAME in the `brandon-behring.dev` zone (no manual DNS record edit needed; you already own the zone)

Verify (under 60s typical):

```bash
curl -I https://dml.brandon-behring.dev/    # expect HTTP/2 200
```

### 5. Pass 2 — flip DML's `site:` URL to the custom domain

```bash
cd /home/brandon_behring/Claude/double_ml_time_series
# Edit web/astro.config.mjs:
#   site: 'https://brandon-behring-double-ml-time-series.brandon-m-behring.workers.dev'
#   → 'https://dml.brandon-behring.dev'
git add web/astro.config.mjs
git commit -m "feat(web): Pass 2 — flip site URL to dml.brandon-behring.dev"
git push origin main
```

Second deploy lands. Canonical URLs, sitemap, OG metadata now match the custom domain.

---

## ⏳ Pending (ssm-foundations — Phase 1b, strict-sequential)

**Do not start Phase 1b until DML's Pass 2 is verified live.** Reasoning: the `deploy-workflows@main` reusable is in flight; if anything breaks on DML, fix once before bringing ssm-foundations into the same dependency chain.

### 0. Code changes (out of scope for this checklist)

Tasks #14 + #15 in the DML plan cover the local file changes for ssm-foundations (wrangler migration, astro.config fixes, package.json scripts, per-chapter shim, new deploy.yml). See `~/.claude/plans/what-is-the-start-rustling-diffie.md` Section 7.

### 1. Set the two repo secrets for `ssm-foundations`

Same as DML Step 2 — paste the same values:

```bash
gh secret set CLOUDFLARE_ACCOUNT_ID --repo brandon-behring/ssm-foundations
gh secret set CLOUDFLARE_API_TOKEN  --repo brandon-behring/ssm-foundations

gh secret list --repo brandon-behring/ssm-foundations
```

### 2. Push to `main`

```bash
cd /home/brandon_behring/Claude/ssm-foundations
git push origin main
gh run watch
```

Site lands at `https://brandon-behring-ssm-foundations.brandon-m-behring.workers.dev`.

### 3. Bind `ssm-foundations.brandon-behring.dev`

Same flow as DML Step 4 — different Worker name + domain:

1. Cloudflare dashboard → Workers & Pages → click `brandon-behring-ssm-foundations`
2. Settings → Domains & Routes → Add → Custom Domain → `ssm-foundations.brandon-behring.dev`

```bash
curl -I https://ssm-foundations.brandon-behring.dev/   # expect HTTP/2 200
```

### 4. Pass 2 — flip ssm-foundations' `site:` URL

Same shape as DML Step 5, in `ssm-foundations/astro.config.mjs`. Then `git push origin main` for the redeploy.

### 5. Update `projects.json` site_url (if needed)

```bash
cd /home/brandon_behring/Claude/brandon-behring.dev
# Check current ssm-foundations entry in src/data/projects.json
# If site_url != "https://ssm-foundations.brandon-behring.dev", update it.
# Commit + push triggers a brandon-behring.dev redeploy.
```

---

## Quick reference

### What persists across projects

| Thing | Where | One per |
|---|---|---|
| Cloudflare account | Cloudflare dashboard | account |
| Zone (`brandon-behring.dev`) | Cloudflare DNS | zone (covers all subdomains) |
| Account ID | Cloudflare dashboard sidebar | account |
| API token | Cloudflare My Profile → API Tokens | scope (one token can serve N repos) |
| Cloudflare ↔ GitHub OAuth | Cloudflare account settings | account |

### What's project-specific

| Thing | Per-project? |
|---|---|
| Repo secrets (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`) | **yes** — set in each repo separately |
| Worker name | yes — one per project, globally unique in your account |
| `wrangler.jsonc` | yes — one per project |
| Custom domain | yes — one bound per Worker (subdomain of `brandon-behring.dev`) |

### Worker name ↔ URL ↔ domain mapping

| Project | Worker name | workers.dev URL (Pass 1) | Custom domain (Pass 2) |
|---|---|---|---|
| brandon-behring.dev | `brandon-behring` | `brandon-behring.brandon-m-behring.workers.dev` | `brandon-behring.dev` |
| double_ml_time_series | `brandon-behring-double-ml-time-series` | `brandon-behring-double-ml-time-series.brandon-m-behring.workers.dev` | `dml.brandon-behring.dev` |
| ssm-foundations | `brandon-behring-ssm-foundations` | `brandon-behring-ssm-foundations.brandon-m-behring.workers.dev` | `ssm-foundations.brandon-behring.dev` |

---

## Troubleshooting

### `gh secret list` shows no secrets

You're authenticated as the wrong user or the repo isn't yours. Check `gh auth status`.

### Workflow fails with "Bad credentials" on `wrangler-action`

Either the API token is wrong, lacks scope, or you set the secret value to the Account ID (and vice versa). Double-check by:

```bash
curl -s -H "Authorization: Bearer <TOKEN>" \
  https://api.cloudflare.com/client/v4/user/tokens/verify \
  | jq .result.status
# Should be "active"
```

### Custom domain binding fails with "Zone not found"

The token wasn't scoped to include the `brandon-behring.dev` zone. Create a new token with the right zone scope and replace the secret.

### Custom domain returns 522 right after binding

The Worker has no version yet — push code to trigger a deploy. Resolves once a Worker version exists.

### Custom domain returns 525 / SSL error

Cloudflare needs 30–60s after binding to provision the edge cert. If it persists past 5 minutes, check Workers → Settings → Domains for a warning banner about pending SSL.

---

## Order summary (TL;DR)

1. ⏳ **Merge** `brandon-behring/deploy-workflows#1`
2. ⏳ **Set DML secrets**: `gh secret set CLOUDFLARE_{API_TOKEN,ACCOUNT_ID} --repo brandon-behring/double_ml_time_series`
3. ⏳ **Push DML**: `git push origin main` in `~/Claude/double_ml_time_series`
4. ⏳ **Bind** `dml.brandon-behring.dev` in Cloudflare dashboard
5. ⏳ **Pass 2**: flip DML `site:` URL, push
6. ⏳ **Phase 1b code changes** in `~/Claude/ssm-foundations` (separate session — see plan Section 7)
7. ⏳ **Set ssm-foundations secrets** (same values as DML)
8. ⏳ **Push ssm-foundations**, watch deploy
9. ⏳ **Bind** `ssm-foundations.brandon-behring.dev`
10. ⏳ **Pass 2**: flip ssm-foundations `site:` URL, push
11. ⏳ **Update** `projects.json` if its ssm-foundations `site_url` doesn't match

Everything before Step 1 (Cloudflare account, zone, OAuth, API-token mechanics) is already done from the brandon-behring.dev setup.
