# ES2026 JavaScript Exploration

This repository explores upcoming JavaScript (ECMAScript 2026) features and practical modernizations.

## Feature: Replace `Array.prototype.reduce` with `Math.sumPrecise`

This exploration focuses on updating numerical reduction patterns across the codebase by using a precise summation helper instead of raw `reduce`.

Previously:

```js
const arr = [0.1, 0.2, 0.3];
arr.reduce((a, b) => a + b) // 0.6000000000000001
```

Now:

```js
Math.sumPrecise([0.1, 0.2, 0.3]) // 0.6
```


This feature is intended to reduce floating-point rounding errors and improve numeric stability in JavaScript projects.

## TypeScript Build Exploration

This repository includes a TypeScript build exploration under `ts-build/`.

The sample project demonstrates:

- TypeScript decorators with `experimentalDecorators`
- Bundling with `esbuild`
- Serving the output with a simple local development server

Run the demo from `ts-build/` using the provided scripts in `ts-build/package.json`.

## Update => Outdated: Exploring jsonModules in ES2025

This commit focuses on the new `jsonModules` feature introduced in ES2025. 

```bash
git checkout jsonModules
```

## Related Proposals

- **Iterator Helpers Proposal (TC39-Stage 4)** – Adds handy methods like `map`, `filter`, `take`, and more to JavaScript's `Iterator` prototype via a standard-stage TC39 proposal. ([GitHub repo](https://github.com/tc39/proposal-iterator-helpers))

## Angular Framework Fix (Arrow Functions in Templates)

The following links document a developer-led exploration carried out as part of regular learning, covering an issue related to arrow functions in Angular templates and how it was fixed in the Angular framework.

- [Dev blog – Angular 21.2 arrow functions gotchas](https://dev.to/brianmtreese/angular-212-new-feature-arrow-functions-in-templates-with-gotchas-4ahg)
- [Angular issue #14129](https://github.com/angular/angular/issues/14129)
- [Angular fix commit](https://github.com/angular/angular/commit/d9923b72a20972ba6bf728d78f1afac6936ade18)
- [Angular v21.2.0-next.0 release](https://github.com/angular/angular/releases/tag/v21.2.0-next.0)

