/* eslint-disable no-param-reassign */
export default ({ appliedAddons, addons }) =>
  addons?.reduce((prev, addon) => {
    prev = {
      ...prev,
      ...appliedAddons[addon.name].model
    };
    return prev;
  }, {}) || {};
