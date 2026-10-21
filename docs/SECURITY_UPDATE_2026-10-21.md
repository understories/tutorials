# Security Dependency Update — 2026-10-21

## Summary

Dependency security sweep across every package in this repository:

| Package | Lockfile | Audit before | Audit after |
| --- | --- | --- | --- |
| `serverless-dapp101/` | `package-lock.json` (npm) | 20 (1 critical, 16 high, 3 moderate) | 6 (6 high) |
| `extractions/arkiv-nextjs-starter/` | none (ranges only) | 9 (1 critical, 6 high, 2 moderate) | 5 (5 high) |
| `extractions/arkiv-app-kit/` | none (ranges only) | 0 | 0 |

Audit counts are packages flagged by `npm audit`. All remaining findings are one advisory
(`braces`, GHSA-vfj7-8cjw-p6xm) reached through Tailwind CSS 3 build tooling; see
[Remaining items](#remaining-items).

The `extractions/` packages have no committed lockfiles, so only their declared ranges were
raised (to patched / latest-in-major versions). They were audited and checked using a
temporary lockfile, which was not committed.

## Advisories fixed

### serverless-dapp101

| Package | Severity | Advisories | From → To |
| --- | --- | --- | --- |
| next | critical | GHSA-2xp9-vwfh-vxw4, GHSA-p293-qw3h-jr36 (RCE) | 15.5.9 → 15.5.28 |
| next | high | GHSA-p9j2-gv94-2wf4, GHSA-36qx-fr4f-26g5, GHSA-q4gf-8mx6-v5v3, GHSA-8h8q-6873-q5fj, GHSA-m99w-x7hq-7vfj, GHSA-c4j6-fc7j-m34r, GHSA-89xv-2m56-2m9x, GHSA-mg66-mrh9-m8jx, GHSA-267c-6grr-h53f, GHSA-26hh-7cqf-hhc6, GHSA-492v-c6pp-mqqv, GHSA-h25m-26qc-wcjf | 15.5.9 → 15.5.28 |
| next | moderate/low | GHSA-9g9p-9gw9-jx7f, GHSA-3x4c-7xq6-9pq8, GHSA-h64f-5h5j-jqjh, GHSA-gx5p-jg67-6x7h, GHSA-4633-3j49-mh5q, GHSA-4c39-4ccg-62r3, GHSA-68g3-v927-f742, GHSA-955p-x3mx-jcvp, GHSA-ffhc-5mcf-pf4q, GHSA-wfc6-r584-vfw7, GHSA-4jqv-mc3x-m676, GHSA-mcj8-r9mp-w47p, GHSA-q8wf-6r8g-63ch, GHSA-ggv3-7p47-pfv8, GHSA-3g8h-86w9-wvmq, GHSA-vfv6-92ff-j949 | 15.5.9 → 15.5.28 |
| postcss (bundled by next) | high | GHSA-6g55-p6wh-862q, GHSA-r28c-9q8g-f849, GHSA-qx2v-qp2m-jg93, GHSA-fxqj-rqcc-2cmp | 8.4.31 → 8.5.31 (override) |
| postcss (direct) | high | same as above | 8.5.6 → 8.5.31 |
| sharp | high | GHSA-f88m-g3jw-g9cj, GHSA-rgj7-g3m4-5g8c, GHSA-wq5f-xc86-pv6w | 0.34.5 → 0.35.5 |
| ws | high | GHSA-96hv-2xvq-fx4p, GHSA-58qx-3vcg-4xpx | 8.18.3 → 8.21.0 (via viem 2.57.7) |
| brace-expansion | high | GHSA-3jxr-9vmj-r5cp, GHSA-6j4f-fj2g-mc7p, GHSA-qhr7-859c-m2p7, GHSA-mh99-v99m-4gvg, GHSA-rgw5-rvv9-x895, GHSA-q2hr-2g5m-vwhr | 5.0.6 → 5.0.12 |
| browserslist | high | GHSA-73wf-gq98-2v4g, GHSA-c83g-rgw3-j3cx | 4.28.1 → 4.29.4 |
| linkify-it | high | GHSA-22p9-wv53-3rq4, GHSA-v245-v573-v5vm | 5.0.0 → 5.0.2 |
| markdown-it | high | GHSA-r7fv-28h4-cvq7, GHSA-gfr2-rv44-r23c, GHSA-vfgh-jcmw-g37q, GHSA-253c-mchw-3w2r, GHSA-6v5v-wf23-fmfq | 14.1.1 → 14.3.3 |
| nanoid | high | GHSA-xwg4-73v4-xw9w, GHSA-28wg-ghj8-5hjv, GHSA-2v37-7h3g-55p8 | 3.3.11 → 3.3.20 |
| picomatch | high | GHSA-c2c7-rcm5-vvqj, GHSA-3v7f-55p6-f55p | 2.3.1 → 2.3.2, 4.0.3 → 4.0.7 |
| source-map-js | high | GHSA-68fv-2mgg-jv7q | 1.2.1 → 1.2.2 |
| postcss-selector-parser | moderate | GHSA-rj75-hqrm-r3gf, GHSA-w9m9-85wc-3x92 | 6.0.10 / 6.1.2 → 7.1.7 (override) |
| baseline-browser-mapping | moderate | GHSA-w5vr-8v7q-w6rv | 2.9.11 → 2.11.30 |

### extractions/arkiv-nextjs-starter

| Package | Severity | Advisories | From → To |
| --- | --- | --- | --- |
| next | critical | GHSA-2xp9-vwfh-vxw4, GHSA-p293-qw3h-jr36, plus the high/moderate/low `next` advisories listed above | `^14.0.0` (14.2.35) → `^15.5.28` |
| postcss | high | GHSA-6g55-p6wh-862q, GHSA-r28c-9q8g-f849, GHSA-qx2v-qp2m-jg93, GHSA-fxqj-rqcc-2cmp | `^8.0.0` → `^8.5.31` (+ override for next's bundled copy) |
| postcss-selector-parser | moderate | GHSA-rj75-hqrm-r3gf | 6.x → 7.1.7 (override) |

**Major bump taken:** `next` 14 → 15 (with `react`/`react-dom` 18 → 19 and matching
`@types/*`, which Next 15 requires). The two critical RCE advisories have no fix on the 14.x
line (latest 14.2.35 is still affected), so this was the only way to fix them.

## Overrides added

Added to `serverless-dapp101/package.json` and `extractions/arkiv-nextjs-starter/package.json`:

```json
"overrides": {
  "next": { "postcss": "$postcss" },
  "postcss-selector-parser": "^7.1.7"
}
```

- `next` pins an old `postcss` (8.4.31) internally. The override makes it use the
  project's patched `postcss` (8.5.x, same major).
- `postcss-selector-parser` 7.1.6+ fixes GHSA-rj75-hqrm-r3gf. Tailwind CSS 3 and
  `@tailwindcss/typography` declare 6.x. In `serverless-dapp101`, the compiled CSS from
  `next build` was **byte-identical** before and after the override.

## Other dependency updates (within the same major)

- **serverless-dapp101:** react / react-dom 19.2.3 → 19.3.1, viem 2.43.5 → 2.57.7,
  @tailwindcss/typography 0.5.19 → 0.5.20, autoprefixer 10.4.23 → 10.6.1,
  @types/node 22.19.3 → 22.20.5, @types/react 19.2.7 → 19.3.0,
  @types/react-dom 19.2.3 → 19.3.0. The declared ranges in `package.json` were raised to match.
- **arkiv-nextjs-starter:** ranges raised to @types/node `^20.19.43`, typescript `^5.9.3`,
  tsx `^4.23.15`, tailwindcss `^3.4.19`, autoprefixer `^10.6.1`.
- **arkiv-app-kit:** ranges raised to @types/node `^20.19.43`, typescript `^5.9.3`.

## Verification

### serverless-dapp101

| Command | Before | After |
| --- | --- | --- |
| `rm -rf node_modules && npm ci` | ok | ok |
| `npm audit` | 20 (1 critical / 16 high / 3 moderate) | 6 (6 high, all `braces` chain) |
| `npm run typecheck` | pass | pass |
| `npm run build` | pass | pass (all routes prerendered; compiled CSS identical) |
| `npm run lint` | not configured: `next lint` opens an interactive ESLint setup prompt | unchanged |

### extractions (temporary lockfile, not committed)

| Package / command | Before | After |
| --- | --- | --- |
| arkiv-app-kit `npm audit` | 0 | 0 |
| arkiv-app-kit `npx tsc --noEmit` | fails (pre-existing) | fails with identical output |
| arkiv-nextjs-starter `npm audit` | 9 (1 critical / 6 high / 2 moderate) | 5 (5 high, `braces` chain) |
| arkiv-nextjs-starter `npx tsc --noEmit` | fails (pre-existing) | fails with identical output |
| arkiv-nextjs-starter `npm run build` | fails (pre-existing) | fails with the same error |

The extraction failures already existed and are not dependency regressions:

- The source imports `custom` from `@arkiv-network/sdk` and `mendoza` from
  `@arkiv-network/sdk/chains`, which the declared `^0.1.0` SDK does not export.
- The starter's webpack build can't resolve the `./queries.js` ESM-style import in
  `arkiv-app-kit/src/txhash-entities.ts`.

To confirm the Next 15 / React 19 bump is compatible with the starter's own app code, a
throwaway copy was built with those two issues bypassed (webpack `extensionAlias`,
`typescript.ignoreBuildErrors`). `next build` compiled and prerendered all 7 routes.

## Remaining items

- **`braces` <= 3.0.3 — GHSA-vfj7-8cjw-p6xm (high, stack-exhaustion DoS).** No patched
  `braces` release exists (3.0.3 is the latest). It is reached only through Tailwind CSS 3
  build tooling (`chokidar`, `micromatch`, `fast-glob`), so `npm audit` also flags
  `tailwindcss` and `@tailwindcss/typography`. The only fix is migrating to Tailwind CSS 4.
  That migration rewrites the config (new PostCSS plugin, CSS-first config, plugin loading),
  so it is not a drop-in bump and was not done. Exposure is limited to build/dev time with
  trusted inputs. Affects `serverless-dapp101` and `arkiv-nextjs-starter`.
- **Available major upgrades not taken:**
  - next 16
  - tailwindcss 4
  - typescript 7
  - @types/node 24+ (Node major alignment)
  - `@arkiv-network/sdk` 0.8.x: in `serverless-dapp101` 0.6.8 → 0.8.1 is a 0.x breaking
    range; the extractions pin `^0.1.0`, though their source targets a newer SDK API.
- **arkiv-app-kit** `npm test` is a placeholder that always exits 1 (no tests defined).
