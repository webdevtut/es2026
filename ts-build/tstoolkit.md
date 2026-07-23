## Install

```sh
# macOS / Linux
curl -fsSL https://nubjs.com/install.sh | bash

# Windows (PowerShell)
irm https://nubjs.com/install.ps1 | iex

# Homebrew (macOS / Linux)
brew install nubjs/tap/nub

# Nix (flakes)
nix run github:nubjs/nub

# mise
mise use -g nub

# Or via npm (pnpm / yarn global add work too)
npm install -g --ignore-scripts=false @nubjs/nub
```

<br/>

## File runner — `nub <file>`

Run a file. Supports `.js`, `.ts`, `.mjs`, `.cjs`, `.mts`, `.cts`, `.jsx`, and `.tsx`. Flag-for-flag and var-for-var drop-in compatible with `node` (mostly via passthrough).

```sh
nub index.ts             # TypeScript, JSX, no build step
nub --watch app.ts       # same path, restart-on-change
```

It augments stock Node with some of Bun/Deno's best features:

- 🦆 Full TypeScript support, including `enum`, `namespace`
- 🧭 TypeScript-friendly resolution: extensionless imports, `tsconfig.json#paths`
- ⚛️ JSX / TSX
- 🎂 Decorators and `emitDecoratorMetadata`
- 🆕 Modern syntax like `using` (downleveled in transpiler when needed)
- 🔐 Automatic `.env*` loading — Next.js/Vite parity
- 🗂️ Built-in loaders for common data formats — `.yaml`, `.toml`, `.jsonc`, `.json5`, `.txt`
- 🌐 Polyfills for `Temporal`, `Worker`, `URLPattern` (when needed)
- 🔥 Unflags experimental features like `node:sqlite`, `vm.Module`, `localStorage`, `WebSocket`, `EventSource`
- ⚡ 2.9× faster startup than `tsx`

<br/>

## Script runner — `nub run`

A drop-in for `npm run` and `pnpm run`. The runner is a Rust binary with no JavaScript startup of its own, so it dispatches a warm script roughly 24× faster than `pnpm run`:

```sh
nub run build
nub run -r --filter "@org/*" test     # supports --filter
```

It's fast compared to existing JavaScript-based script runners.

| Command | Time | Relative |
|---|---|---|
| `nub run` | 14.7 ms | — |
| `npm run` | 329.9 ms | 22× |
| `pnpm run` | 442.7 ms | 30× |

> script dispatch · warm · 50 runs · macOS — [view benchmark](https://github.com/nubjs/nub/tree/main/tests/bench/script-runner)

- 🚀 Feels instantaneous — 14ms vs a detectable 300ms+ lag for npm/pnpm
- 🔁 Full lifecycle support — `pre`/`post` hooks and the complete `npm_*` environment
- 🧰 Local `node_modules/.bin` on `PATH`, with args forwarded without the `--` separator
- 🗃️ The full pnpm workspace surface — `-r`, `--filter`, `--parallel`, `--workspace-concurrency`, `--resume-from`, `--stream`
- 🎯 pnpm's `--filter` grammar verbatim — graph (`...@org/web`) and changed-since (`[main]`) selectors

View the [full script runner docs 👉](https://nubjs.com/docs/runner/run).

<br/>