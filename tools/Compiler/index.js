const webpack = require("webpack");
const { resolve } = require("path");
const WebpackDevServer = require("webpack-dev-server");

module.exports = class Compiler {
  get compiler() {
    return webpack(this.config);
  }

  /**
   *
   * @param { webpack.Configuration } options
   */
  constructor(options) {
    this.config = {
      entry: () => this.entries,
      module: {
        rules: [],
      },
      resolve: {
        alias: {},
        extensions: [".ts", ".tsx", ".json", ".js", ".jsx"],
      },
      plugins: [],
      externals: [],
      optimization: {
        chunkIds: "named",
        moduleIds: "deterministic",
        minimizer: [],
        splitChunks: {
          automaticNameDelimiter: ".",
        },
      },
      ...options,
    };
  }

  /**
   *
   * @param {webpack.Configuration["resolve"]["alias"]} pathAlias
   */
  usePathAlias = (pathAlias) => {
    this.config.resolve.alias = { ...this.config.resolve.alias, ...pathAlias };
  };

  /**
   *
   * @param {webpack.EntryObject} entries
   */
  useEntries = (entries) => {
    this.entries = { ...this.entries, ...entries };

    return this;
  };

  /**
   *
   * @param {RegExp} test
   * @param {webpack.RuleSetUse} loaders
   * @returns
   */
  useLoaders = (test, loaders) => {
    this.config.module.rules.push({
      test,
      use: loaders,
      exclude: test.test(".js") ? /node_modules/ : undefined,
    });

    return this;
  };

  /**
   *
   * @param {webpack.Configuration["plugins"]} plugins
   */
  usePlugins = (plugins) => {
    this.config.plugins.push(...plugins);

    return this;
  };

  /**
   *
   * @param {webpack.Configuration["externals"][]} externals
   */
  useExternals = (externals) => {
    this.config.externals.push(...externals);

    return this;
  };

  /**
   *
   * @param {(err: Error, stats: webpack.Stats) => void} callback
   */
  compile = (callback = () => {}) => {
    this.compiler.run(callback);
  };

  /**
   *
   * @param {WebpackDevServer.Configuration} options
   * @returns WebpackDevServer
   */
  devServer = (options = {}) => {
    this.config.mode = "development";

    const server = new WebpackDevServer(this.compiler, {
      static: resolve(__dirname, "../../dist"),
      watchFiles: resolve(__dirname, "../../packages/**"),
      ...options,
    });

    server.listen(
      options.port ?? 8080,
      options.host ?? "localhost",
      console.error
    );

    return server;
  };
};
