# Security Policy

## Supported Versions

Only the `main` branch receives security fixes. The tutorials and extractions are learning
materials and have no versioned releases.

## Reporting a Vulnerability

Please report vulnerabilities privately. Do not open a public issue.

1. Go to this repository's **Security** tab on GitHub.
2. Choose **Report a vulnerability** to use GitHub private vulnerability reporting.

Include the affected path (e.g. `serverless-dapp101/`), steps to reproduce, and impact. We
will acknowledge the report and coordinate a fix and disclosure with you.

## Dependency Maintenance

Each package's dependencies are audited periodically with `npm audit` and kept on patched
versions within their current major. Each sweep is recorded with a dated report in
[`docs/`](./docs/). The most recent one is
[`docs/SECURITY_UPDATE_2026-10-21.md`](./docs/SECURITY_UPDATE_2026-10-21.md).
