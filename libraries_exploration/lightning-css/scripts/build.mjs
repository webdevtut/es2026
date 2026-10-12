import { readFile, mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { transform } from "lightningcss";

const root = process.cwd();
const sourceHtml = await readFile(path.join(root, "index.html"), "utf8");
const sourceCss = await readFile(
  path.join(root, "src/styles/main.module.css"),
  "utf8"
);

const result = transform({
  filename: path.join(root, "src/styles/main.module.css"),
  code: Buffer.from(sourceCss),
  minify: true,
  sourceMap: false,
  drafts: {
    nesting: true,
    customMedia: true
  },
  cssModules: {
    pattern: "[name]_[hash]_[local]",
    dashedIdents: true,
    animation: true,
    grid: true,
    customIdents: true
  }
});

const exports = result.exports ?? {};
const htmlWithScopedClasses = sourceHtml.replace(
  /class="([^"]+)"/g,
  (_match, classList) => {
    const scoped = classList
      .split(/\s+/)
      .map((className) => exports[className]?.name ?? className)
      .join(" ");
    return `class="${scoped}"`;
  }
);

const outputDir = path.join(root, "dist");
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, "index.html"), htmlWithScopedClasses);
await writeFile(path.join(outputDir, "styles.css"), result.code);

console.log("Built dist/index.html and dist/styles.css with Lightning CSS.");
console.log(`Scoped ${Object.keys(exports).length} CSS Module class names.`);
