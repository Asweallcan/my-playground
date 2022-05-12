module.exports = {
  babel: (options) => {
    return {
      loader: require.resolve("babel-loader"),
      options: {
        presets: [
          require.resolve("@babel/preset-env"),
          require.resolve("@babel/preset-react"),
          require.resolve("@babel/preset-typescript"),
        ],
        plugins: [
          require.resolve("@babel/plugin-transform-runtime"),
          require.resolve("@babel/plugin-proposal-class-properties"),
        ],
        cacheDirectory: true,
        ...options,
      },
    };
  },
  handlebars: (options) => {
    return {
      loader: require.resolve("handlebars-loader"),
      options,
    };
  },
  css: (options) => {
    return {
      loader: require.resolve("css-loader"),
      options,
    };
  },
  less: (options) => {
    return {
      loader: require.resolve("less-loader"),
      options,
    };
  },
  style: (options) => {
    return {
      loader: require.resolve("style-loader"),
      options,
    };
  },
  worker(options) {
    return {
      loader: require.resolve("worker-loader"),
      options,
    };
  },
  json(options) {
    return {
      loader: require.resolve("json-loader"),
      options,
    };
  },
};
