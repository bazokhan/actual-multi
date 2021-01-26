/* eslint-disable no-param-reassign */
import { assign } from '../helpers';

export default ({ addons, appliedAddons }) => self =>
  addons?.reduce((prev, addon) => {
    prev = assign(
      prev,
      appliedAddons[addon.name].views(self)
    );
    return prev;
  }, {}) || {};
