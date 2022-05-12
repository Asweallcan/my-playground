const { resolve } = require("path");

module.exports = {
  react: resolve(
    __dirname,
    "../../node_modules/react/umd/react.production.min.js"
  ),
  "react-dom": resolve(
    __dirname,
    "../../node_modules/react-dom/umd/react-dom.production.min.js"
  ),
  lodash: resolve(__dirname, "../../node_modules/lodash/lodash.min.js"),
  "styled-components": resolve(
    __dirname,
    "../../node_modules/styled-components/dist/styled-components.min.js"
  ),
};
