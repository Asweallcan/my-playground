const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebapckPlugin = require("html-webpack-plugin");

module.exports = {
  /**
   *
   * @param {CopyWebpackPlugin.PluginOptions} options
   * @returns CopyWebpackPlugin
   */
  copy: (options) => {
    return new CopyWebpackPlugin(options);
  },
  /**
   *
   * @param {HtmlWebapckPlugin.Options} options
   * @returns HtmlWebapckPlugin
   */
  html: (options) => {
    return new HtmlWebapckPlugin(options);
  },
};
