const { resolve } = require("path");
const { writeFileSync } = require("fs");

const extenrals = require("./externals");

const Compiler = require("../../tools/Compiler");
const plugins = require("../../tools/Compiler/plugins");
const loaders = require("../../tools/Compiler/loaders");

const compiler = new Compiler({
  mode: "development",
  output: {
    path: resolve(__dirname, "../../public/externals"),
    clean: true,
    library: "[name]",
    filename: "[name].[contenthash].js",
    libraryTarget: "amd",
  },
});

compiler
  .useEntries(extenrals)
  .useLoaders(/\.[tj]sx?$/, [loaders.babel()])
  .usePlugins([
    plugins.copy({
      patterns: [
        {
          from: resolve(__dirname, "../../node_modules/requirejs/require.js"),
          to: resolve(__dirname, "../../public/externals/require.js"),
        },
      ],
    }),
  ])
  .useExternals(Object.keys(extenrals));

compiler.compile((err, stats) => {
  const externals = Object.keys(stats.compilation.assets).reduce(
    (acc, filename) => {
      const externalName = filename.split(".")[0];

      acc[externalName] = filename;

      return acc;
    },
    {}
  );

  writeFileSync(
    resolve(__dirname, "../../public/externals.json"),
    JSON.stringify(externals)
  );
});
