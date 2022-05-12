const { resolve } = require("path");

const Compiler = require("../tools/Compiler");
const loaders = require("../tools/Compiler/loaders");
const plugins = require("../tools/Compiler/plugins");
const EntryManager = require("../tools/EntryManager");
const getTemplateParameters = require("../tools/getTemplateParameters");

const externals = require("../public/externals.json");

const compiler = new Compiler({
  mode: "development",
  output: {
    path: resolve(__dirname, "../build"),
    clean: true,
    library: "[name]",
    filename: "[name].[contenthash].js",
    publicPath: "",
    libraryTarget: "amd",
  },
  devtool: "source-map",
});

const packagesEntry = EntryManager.getPackagesEntry();

compiler
  .useEntries(packagesEntry)
  .useLoaders(/\.[tj]sx?$/, [loaders.babel()])
  .useLoaders(/\.hbs$/, [loaders.handlebars()])
  .usePlugins([
    plugins.copy({
      patterns: [
        {
          from: resolve(__dirname, "../public/externals"),
          to: resolve(__dirname, "../build/externals"),
        },
        {
          from: resolve(__dirname, "../public/remotes"),
          to: resolve(__dirname, "../build/remotes"),
        },
      ],
    }),
    plugins.html({
      inject: false,
      filename: "index.html",
      template: resolve(__dirname, "../public/index.hbs"),
      templateParameters: (compilation, assets) => {
        return getTemplateParameters(compilation, assets);
      },
    }),
  ])
  .useExternals(
    Object.keys({
      ...externals,
      ...packagesEntry,
    })
  )
  .devServer({
    open: true,
    watchFiles: [resolve(__dirname, "../packages/**")],
  });
