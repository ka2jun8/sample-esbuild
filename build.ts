import {build} from "esbuild";
import {sassPlugin} from "./esbuild-plugin-sass"

console.log("aaa: ", process.env.NODE_ENV)
const isDev = process.env.NODE_ENV !== "production";

build({
  target: "es2015",
  platform: "browser",
  entryPoints: ["src/index.tsx"],
  outdir: "public",
  bundle: true,
  minify: !isDev,
  sourcemap: !isDev,
  plugins: [sassPlugin({ sourceMap: isDev })],
  watch: isDev && {
    onRebuild(err, result) {
      if(err || result && result.warnings.length > 0) {
        console.log(JSON.stringify(err?.errors));
        console.log(JSON.stringify(result?.warnings));
      }
    },
  },
}).then(()=>{
  console.log("=========================");
  console.log(`${new Date().toLocaleDateString()}: build success`)
})
  .catch((err) => console.log(`Error: ${JSON.stringify(err)}`));
