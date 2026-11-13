// usage: node scripts/stills.mjs <outPrefix> <frame,frame,...> [scale] [compositionId]
// Bundles once, then renders one JPEG per frame. Adapted from the skill's templates/scripts/bridge-stills.mjs:
// the browser comes from CHROME (default: the cloud session's Chromium) and GL from GL (default: swangle, software).
// ENTRY=src/sandboxes/<name>/index.tsx renders a sandbox copy instead of the main entry.
// NOT YET RUN in this repo: see ../SOURCE.md.
import fs from "node:fs";
if (process.env.REMOTION_TMP) { fs.mkdirSync(process.env.REMOTION_TMP, { recursive: true }); process.env.TEMP = process.env.TMP = process.env.TMPDIR = process.env.REMOTION_TMP; }
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
const [prefix, frames, scale = "0.5", id = "BridgeShort"] = process.argv.slice(2);
const browserExecutable = process.env.CHROME || "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome";
const chromeMode = "chrome-for-testing";
const chromiumOptions = { gl: process.env.GL || "swangle" };
const serveUrl = await bundle({ entryPoint: path.resolve(process.env.ENTRY || process.env.BRIDGE_ENTRY || "src/index.tsx"), publicDir: path.resolve("public") });
const composition = await selectComposition({ serveUrl, id, browserExecutable, chromeMode, chromiumOptions });
const onBrowserLog = (l) => { if (l.type === "error" || l.type === "warning") console.log(`[${l.type}]`, l.text.slice(0, 300)); };
for (const f of frames.split(",").map(Number)) {
  const t0 = Date.now();
  await renderStill({ composition, serveUrl, frame: f, output: `${prefix}${f}.jpg`, imageFormat: "jpeg", jpegQuality: 88, scale: Number(scale),
    browserExecutable, chromeMode, chromiumOptions, timeoutInMilliseconds: 300000, onBrowserLog });
  console.log("still", f, ((Date.now() - t0) / 1000).toFixed(1) + "s");
}
