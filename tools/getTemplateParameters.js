const externals = require("../public/externals.json");

module.exports = function getTemplateParameters(compilation, assets) {
  const packageAssets = assets.js.reduce((acc, packageFile) => {
    const packageName = packageFile.split(".")[0];

    acc[packageName.replace("%40", "@")] = packageFile.replace("%40", "@");

    return acc;
  }, {});

  const externalAssets = Object.keys(externals || {}).reduce(
    (acc, externalName) => {
      if (externalName === "require") return acc;

      acc[externalName] = `externals/${externals[externalName]}`;

      return acc;
    },
    {}
  );

  return {
    assets: JSON.stringify({ ...packageAssets, ...externalAssets }),
    requireSrc: `externals/${externals.require}`,
  };
};
