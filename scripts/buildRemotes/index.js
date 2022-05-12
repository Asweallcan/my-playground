const { resolve } = require("path");
const { writeFileSync } = require("fs");

const extenrals = require("../buildExternals/externals");

const remotes = require("./remotes");

const Compiler = require("../../tools/Compiler");
const loaders = require("../../tools/Compiler/loaders");

const compiler = new Compiler({
  mode: "development",
  output: {
    path: resolve(__dirname, "../../public/remotes"),
    clean: true,
    library: "[name]",
    filename: "[name].[contenthash].js",
    libraryTarget: "amd",
  },
  devtool: "source-map",
});

compiler
  .useEntries(remotes)
  .useLoaders(/\.[tj]sx?$/, [loaders.babel()])
  .useExternals(Object.keys(extenrals));

compiler.compile((err, stats) => {
  const remotes = Object.keys(stats.compilation.assets).reduce(
    (acc, filename) => {
      if (/\.js\.map$/.test(filename)) return acc;

      const externalName = filename.split(".")[0];

      acc[externalName] = filename;

      return acc;
    },
    {}
  );

  writeFileSync(
    resolve(__dirname, "../../public/remotes.json"),
    JSON.stringify(remotes)
  );
});
