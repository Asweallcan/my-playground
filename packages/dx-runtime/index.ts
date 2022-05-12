import resources from "../../public/remotes.json";

export const loadSource = (name: string) => {
  return new Promise((resolve) => {
    window.requirejs.config({
      paths: {
        // @ts-ignore
        [name]: `remotes/${resources[name].replace(".js", "")}`,
      },
    });

    // @ts-ignore
    window.require([name], (module) => {
      resolve(module.default);
    });
  });
};
