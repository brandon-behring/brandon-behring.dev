# Cloudflare Setup — brandon-behring.dev

First-time setup for the Cloudflare side of the deploy pipeline. Walk through
this once; then any future site deploys just need the secrets in their own
repo (or a future GitHub Org for auto-sync).

**Time estimate:** ~3 minutes.

**Where you are in the plan:** Phase 1A, Steps 4–5 (see
`~/.claude/plans/i-want-to-think-misty-glacier.md`). Steps 1–3 (commit memo,
add `wrangler.jsonc`, install wrangler, update workflow) are already done.
After completing this doc, return to Claude and say "secrets are set."

---

## 1. Get your Cloudflare Account ID

**URL:** <https://dash.cloudflare.com>

Once logged in:

1. Click **Workers & Pages** in the left sidebar.
   - If the Workers Builds wizard from the earlier screenshot is still open in
     another tab, just close that tab — **do not click "Deploy"** on it.
2. On the Workers & Pages overview page, find the **Account details** section
   (right sidebar or near the page footer).
3. Click the copy icon next to **Account ID**. It's a 32-character hex string
   like `a1b2c3d4e5f6...`.

**Alternative path** if you can't find it: click your account name at the
top-right → **Account Home** → menu button at the end of the account row →
**Copy account ID**.

---

## 2. Create the API token

**URL:** <https://dash.cloudflare.com/profile/api-tokens>

1. Click **Create Token** (blue button, top-right).
2. Look for the **"Edit Cloudflare Workers"** template card and click
   **Use template**.
   - **Fallback if the card isn't visible:** scroll to **Custom token** → click
     **Get started**. Under **Permissions** add:
     - `Account` → `Workers Scripts` → `Edit`
     - `Account` → `Account Settings` → `Read`
3. **Account Resources:** leave as "Include — All accounts" (you only have one).
4. **Zone Resources** (only shown for the template): leave as "All zones", or
   restrict to `brandon-behring.dev` — either works.
5. **TTL:** leave blank (no expiry) for now, or set 1 year if you prefer
   scheduled rotation.
6. Click **Continue to summary** → **Create Token**.
7. **Copy the token immediately.** It's shown **once**. If you lose it, you
   have to regenerate.

---

## 3. Set the two GitHub secrets

In your terminal (NOT in chat), run these one at a time. Paste each value at
the prompt and press Enter:

```bash
gh secret set CLOUDFLARE_API_TOKEN --repo brandon-behring/brandon-behring.dev
# Paste the API token from Step 2 at the prompt, press Enter.

gh secret set CLOUDFLARE_ACCOUNT_ID --repo brandon-behring/brandon-behring.dev
# Paste the Account ID from Step 1 at the prompt, press Enter.
```

`gh secret set` reads stdin without echoing and never writes the value to disk
or shell history.

---

## 4. Verify both secrets exist (no values shown)

```bash
gh secret list --repo brandon-behring/brandon-behring.dev
```

Expected output: two lines, one per secret name, with an "Updated [date]"
column. Values are never printed.

| Name | Updated |
|---|---|
| `CLOUDFLARE_ACCOUNT_ID` | today |
| `CLOUDFLARE_API_TOKEN` | today |

---

## 5. Hand back to Claude

Reply in the chat with "secrets are set" (or similar). Claude continues with:

- **Step 6:** Commit the pending Phase 1A changes (`wrangler.jsonc`,
  `deploy.yml`, `package.json`, `package-lock.json`, `.gitignore`), push to
  `main`, watch the workflow run via `gh run watch`. Worker `brandon-behring`
  auto-creates on first deploy.
- **Step 7:** Ping you to bind the custom domain `brandon-behring.dev` to the
  new Worker (one click in the Cloudflare dashboard — domain → Workers & Pages
  → `brandon-behring` → Settings → Domains & Routes → Add Custom Domain).
- **Steps 8–13:** End-to-end verification, content round-trip test, then
  Phase 1B (extract the reusable workflow into a new `deploy-workflows` repo
  and refactor this repo's workflow to a 10-line caller).

---

## Security notes

- The API token is shown **only once** in the dashboard. Save it somewhere
  durable for the duration of this setup, or run `gh secret set` immediately
  after copying it.
- Never paste the token into any file, chat, Slack, screenshots, or commit.
  `wrangler.jsonc` and `.github/workflows/deploy.yml` reference the secret by
  name only — the actual value lives only in GitHub's encrypted secret store.
- **Rotation:** rotate yearly out of habit, or immediately if you suspect a
  leak. To rotate:
  <https://dash.cloudflare.com/profile/api-tokens> → click the token → **Roll**
  → re-run `gh secret set CLOUDFLARE_API_TOKEN ...` with the new value.

---

## Reference: what "Edit Cloudflare Workers" grants

Approximately: `Workers Scripts: Edit`, `Account Settings: Read`,
`Workers KV: Edit`, `Workers R2: Edit`, `Workers Tail: Read`, `Workers Routes:
Edit`, `User Details: Read`. More than `wrangler deploy` strictly needs for
static-assets-only Workers, but it's the maintained least-privilege baseline
Cloudflare recommends. Sufficient for Phase 1A, Phase 1B, and the planned
sibling-site migrations in Phase 2 (per
`deploy-workflows/README.md` once that repo exists).

---

## Reference: source docs

- Cloudflare API tokens: <https://developers.cloudflare.com/fundamentals/api/get-started/create-token/>
- Find account and zone IDs: <https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/>
- Cloudflare GitHub Actions deploy: <https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/>
- `wrangler-action` repo: <https://github.com/cloudflare/wrangler-action>
