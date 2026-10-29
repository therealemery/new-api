<div align="center">

![Ownapi](/web/public/logo.png)

# Ownapi

**AI model gateway and management — branded distribution of [New API](https://github.com/QuantumNous/new-api)**

Website: **[https://ownapi.dev](https://ownapi.dev)**

<p align="center">
  <a href="./README.zh_CN.md">简体中文</a> |
  <a href="./README.zh_TW.md">繁體中文</a> |
  <strong>English</strong>
</p>

</div>

## About

**Ownapi** is a product-branded fork of [QuantumNous/new-api](https://github.com/QuantumNous/new-api): a unified LLM gateway that aggregates many upstream providers behind OpenAI-, Claude-, and Gemini-compatible APIs, with billing, rate limits, and an admin dashboard.

This repository keeps the upstream Go module path and AGPL obligations. See [LICENSE](./LICENSE) and [NOTICE](./NOTICE). Core code is **based on New API**; copyright and attribution for upstream contributors remain in those files.

## Quick start

```bash
# Backend (requires Go 1.22+)
go build -o new-api .
./new-api

# Frontend dev (from web/)
bun install && bun run dev
```

Docker and compose examples live in the repo root (`docker-compose.yml`, `Dockerfile`). Configure via environment variables (same as upstream).

## Documentation

- Product / operator docs: [https://ownapi.dev](https://ownapi.dev)
- Upstream reference: [New API GitHub](https://github.com/QuantumNous/new-api) and [upstream docs](https://docs.newapi.pro) (API behavior and provider details)

## Syncing from upstream

To pull in upstream fixes and features:

```bash
git remote add upstream https://github.com/QuantumNous/new-api.git  # once
git fetch upstream
git merge upstream/main   # resolve conflicts; preserve Ownapi branding in defaults/README
```

Re-apply or verify Ownapi defaults after merges: `common/constants.go` (`SystemName`), `setting/operation_setting/general_setting.go` (`DocsLink`), `web/index.html`, `web/src/helpers/utils.jsx`, footer/about copy, and locale strings.

## License

AGPL-3.0 — see [LICENSE](./LICENSE). You must retain upstream copyright notices and provide source when you distribute modified versions.
