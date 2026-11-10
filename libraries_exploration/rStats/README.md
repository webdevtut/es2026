# rStats.js exploration demo

This folder contains a browser-based exploration and comparison demo for
[rStats.js](https://github.com/numero-uno-jpn/rStats.js), an R-compatible
statistical library for JavaScript. The upstream library provides numerical
functions; this folder provides an interactive UI for trying them, viewing
plots, and comparing results with R.

The demo loads the published `@numero-uno-jpn/rstats` package from jsDelivr by
default. It is not itself a Node.js package, and its UI modules depend on
browser APIs such as the DOM.

## What the library is for

rStats.js brings statistical and numerical functions inspired by R's `stats`
package to JavaScript. Depending on the package version, its feature areas
include:

- Probability distributions, including density/mass, cumulative probability,
  quantiles, and random draws.
- Descriptive statistics, hypothesis tests, and p-value adjustments.
- Special functions, numerical integration and optimization, and interpolation.
- Linear algebra and statistical models.

Function names, option defaults, and results are intended to follow R. Consult
the upstream README and its documentation for the supported functions,
version-specific behavior, and differences from R.

## Backend or frontend?

The **upstream library can be used in both environments**:

- **Backend:** import it as an ES module in a supported Node.js environment
  (the upstream README specifies Node.js 22 or later, or another ES2022
  runtime). It can calculate summaries or statistical results in server-side
  jobs and services.
- **Frontend:** import it into a modern browser application using a bundler, or
  use the published ESM bundle directly. Calculations run in the user's
  browser, which can be useful for interactive analysis without sending data
  to a server.

This **demo folder is frontend-only**. Its JavaScript builds the interface and
expects a browser. By default, the demo fetches the published library bundle,
so an internet connection is needed to load rStats.js.

## Install and use the package

Install the upstream package in your own application:

```sh
npm install @numero-uno-jpn/rstats
```

The package uses ES modules. For example, in Node.js or in a frontend project
with a bundler:

```js
import { mean, sd, tTest } from "@numero-uno-jpn/rstats";

const scores = [5.1, 4.9, 6.2, 5.8, 6.0, 5.5];
console.log({ mean: mean(scores), standardDeviation: sd(scores) });

const comparison = tTest(scores, [4.1, 4.5, 5.0, 4.8, 4.3]);
console.log(comparison.pValue, comparison.confInt);
```

For a browser module without a bundler, use the ESM distribution URL (pin a
version in production):

```html
<script type="module">
  import { pnorm, qnorm } from
    "https://cdn.jsdelivr.net/npm/@numero-uno-jpn/rstats@1.3.0/dist/rstats.js";

  document.querySelector("#result").textContent =
    `P(Z <= 1.96) = ${pnorm(1.96)}; 97.5th percentile = ${qnorm(0.975)}`;
</script>
<p id="result"></p>
```

For API details and more functions, see the
[upstream rStats.js README](https://github.com/numero-uno-jpn/rStats.js/blob/main/README.md).

## Use cases

- **Backend reporting:** calculate means, spread, confidence intervals, or
  hypothesis-test results in a scheduled report or analysis endpoint.
- **Interactive frontend analysis:** show summaries, distribution curves, or
  test results as a user changes input data.
- **Reproducible simulation:** use a seeded random generator to create
  repeatable samples for experiments, demonstrations, and tests.
- **R-to-JavaScript migration:** use familiar R-style statistical functions in
  a JavaScript application, while comparing outputs against R where appropriate.

Statistical results depend on the data and assumptions of each method. Check
those assumptions and the upstream documentation before using results to make
decisions.

## Run this demo

Serve this folder with a static HTTP server, then open the local address it
prints. For example, from the repository root:

```sh
npx serve libraries_exploration/rStats
```

The demo includes distribution plots, descriptive summaries, special
functions, random sampling, hypothesis tests, linear algebra, numerical
methods, and comparisons with reference R results.
