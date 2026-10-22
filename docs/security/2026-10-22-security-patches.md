# Security patches: 2026-10-22

## Summary

`npm audit` reported 20 vulnerabilities in the workshop app `serverless-dapp101/` (1 critical, 15 high, 4 moderate). The critical and most high findings were in Next.js. This update moves Next.js and PostCSS to the latest releases in their current major versions and refreshes vulnerable transitive packages in `package-lock.json`. No major version changes were made. 8 findings remain, all in the Tailwind CSS 3 build toolchain (see below).

If you built a project from this workshop or its `hello-world` code, your copy has the same vulnerable versions. Apply the same changes (see "What to do if you forked or deployed this").

## Changes

| Package | From -> To | Advisories | Why it matters |
| --- | --- | --- | --- |
| next (direct) | 15.5.9 -> 15.5.28 | 30 advisories, including critical GHSA-p293-qw3h-jr36 and GHSA-2xp9-vwfh-vxw4 | Unauthenticated remote code execution (Image Optimization API with AVIF; Windows-hosted servers), middleware bypasses, SSRF, cache poisoning, XSS and DoS in the running server |
| postcss (direct, plus the copy bundled by next) | 8.5.6 and 8.4.31 -> 8.5.31 | GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849 | File read via attacker-controlled `sourceMappingURL`; XSS via unescaped `</style>` |
| sharp (via next) | 0.34.5 -> 0.35.5 | GHSA-f88m-g3jw-g9cj, GHSA-rgj7-g3m4-5g8c, GHSA-wq5f-xc86-pv6w | Bundled libvips, librsvg and libheif flaws reachable through image optimization |
| ws (via viem) | 8.18.3 -> 8.21.0 | GHSA-58qx-3vcg-4xpx, GHSA-96hv-2xvq-fx4p | Memory exhaustion DoS; uninitialized memory disclosure |
| viem (direct) | 2.43.5 -> 2.57.7 | via ws | Pulls the patched ws |
| nanoid | 3.3.11 -> 3.3.20 | GHSA-28wg-ghj8-5hjv, GHSA-2v37-7h3g-55p8, GHSA-xwg4-73v4-xw9w | Integer overflow and infinite loops |
| picomatch | 2.3.1, 4.0.3 -> 2.3.2, 4.0.7 | GHSA-3v7f-55p6-f55p, GHSA-c2c7-rcm5-vvqj | ReDoS; incorrect glob matching |
| brace-expansion | 5.0.6 -> 5.0.12 | GHSA-3jxr-9vmj-r5cp, GHSA-mh99-v99m-4gvg, GHSA-rgw5-rvv9-x895, GHSA-q2hr-2g5m-vwhr, GHSA-qhr7-859c-m2p7, GHSA-6j4f-fj2g-mc7p | DoS from crafted patterns |
| markdown-it | 14.1.1 -> 14.3.3 | GHSA-6v5v-wf23-fmfq, GHSA-253c-mchw-3w2r, GHSA-r7fv-28h4-cvq7, GHSA-vfgh-jcmw-g37q, GHSA-gfr2-rv44-r23c | Quadratic-time DoS on crafted input |
| linkify-it | 5.0.0 -> 5.0.2 | GHSA-22p9-wv53-3rq4, GHSA-v245-v573-v5vm | Quadratic-time DoS |
| source-map-js | 1.2.1 -> 1.2.2 | GHSA-68fv-2mgg-jv7q | Event-loop DoS from crafted source maps |
| browserslist | 4.28.1 -> 4.29.4 | GHSA-c83g-rgw3-j3cx, GHSA-73wf-gq98-2v4g | Unbounded memory growth; crash via untrusted stats file |
| baseline-browser-mapping | 2.9.11 -> 2.11.30 | GHSA-w5vr-8v7q-w6rv | Process termination on invalid input |
| postcss-selector-parser | 6.1.2 -> 6.1.5 | GHSA-w9m9-85wc-3x92 | Recursion DoS (GHSA-rj75-hqrm-r3gf still open, see below) |
| @tailwindcss/typography | 0.5.19 -> 0.5.20 | via postcss-selector-parser | Picks up the patched postcss-selector-parser 6.x |
| caniuse-lite, electron-to-chromium | 1.0.30001762 -> 1.0.30001816, 1.5.267 -> 1.5.459 | none | Browser data required by the patched browserslist |

`serverless-dapp101/package.json` changes: `next` `^15.5.28`, `postcss` `^8.5.31`, and an `overrides` entry `"postcss": "$postcss"` so the PostCSS copy that Next.js pins (8.4.31) uses the patched version too.

## Earlier fix (same day)

Commit 00467d3 moved CI for `extractions/arkiv-nextjs-starter` and `extractions/arkiv-ai-agent-kit` from Node.js 20 to 22.23.4. The October 2026 Node.js security releases (CVE-2026-111497 and nine others) fix a Brotli decoder remote code execution reachable through `fetch()` and two TLS certificate validation bypasses. Node.js 20 is end of life and gets no fix.

## Verification

Run in `serverless-dapp101/` on Node 26.12.0, npm 11.20.0, before and after the change:

| Check | Before | After |
| --- | --- | --- |
| `npm ci` | pass | pass |
| `npm run typecheck` | pass | pass |
| `npm run build` | pass | pass |
| `npm run lint` | fails: no ESLint config in the repo, `next lint` prompts for setup | same, unchanged |
| `npm audit` | 1 critical, 15 high, 4 moderate | 0 critical, 5 high, 3 moderate |

## Not fixed

- `braces` (high, GHSA-vfj7-8cjw-p6xm), with `micromatch`, `fast-glob`, `chokidar` and `tailwindcss` flagged because they depend on it. Every published `braces` version is affected, so there is no patched release to update to or override with. npm's only fix is Tailwind CSS 4, a major upgrade with a different configuration model. These packages run only during `next dev` / `next build` and process the project's own file globs, not user input.
- `postcss-selector-parser` (moderate, GHSA-rj75-hqrm-r3gf), with `postcss-nested` and `@tailwindcss/typography`. The fix is in 7.1.6; Tailwind CSS 3 requires 6.x. Also build-time only.

These go away with a move to Tailwind CSS 4, which is left for a separate change.

- `extractions/arkiv-nextjs-starter` and `extractions/arkiv-app-kit` have no lockfile, so nothing was pinned here; a fresh install resolves the newest versions in each range. `arkiv-nextjs-starter` declares `next@^14`, and the Next.js advisories above (including the critical ones) have no fix in the 14.x line. Moving it to Next.js 15 is a major upgrade and is left for a separate change. Do not deploy that starter as is.

## What to do if you forked or deployed this

1. In your copy of `serverless-dapp101/` (or any app built from it), set `"next": "^15.5.28"` and `"postcss": "^8.5.31"`, add `"overrides": { "postcss": "$postcss" }` to `package.json`, then run `npm install` and `npm audit fix` (not `--force`).
2. Run `npm audit` and confirm no critical findings remain.
3. Redeploy. The Next.js fixes only protect a running server after a new build is deployed.
4. Run Node.js 22.23.4, 24.22.1, 26.12.1 or later in local development, CI and hosting (see "Earlier fix"). If your CI pins Node.js 20, change it.
