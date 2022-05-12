const glob = require("fast-glob");
const { resolve } = require("path");

class EntryManager {
  static shared = new EntryManager();

  get packagesJsonPath() {
    return glob.sync([resolve(__dirname, "../../packages/**/package.json")], {
      absolute: true,
      onlyFiles: true,
    });
  }

  getPackagesEntry = (packagesJsonPath = this.packagesJsonPath) => {
    return packagesJsonPath.reduce((acc, packageJsonPath) => {
      const packageConfig = require(packageJsonPath);
      const packagePath = packageJsonPath.replace("/package.json", "");

      const { main, name } = packageConfig;

      if (!main) {
        throw new Error("Every package.json must assign main");
      }

      acc[name] = `${packagePath}/${main}`;

      return acc;
    }, {});
  };
}

module.exports = EntryManager.shared;
