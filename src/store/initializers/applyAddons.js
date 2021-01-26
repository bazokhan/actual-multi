/* eslint-disable no-param-reassign */
const applyAddons = (registeredAddons, addons = []) => {
  if (!addons.length) return {};
  return addons.reduce((prev, addon) => {
    prev[addon.name] = registeredAddons[addon.name](
      addon.options
    );
    return prev;
  }, {});
};

export default applyAddons;
