const { resolve } = require("path");

module.exports = {
  CustomComponentA: resolve(
    __dirname,
    "../../remoteComponents/CustomComponentA/index.tsx"
  ),
};
