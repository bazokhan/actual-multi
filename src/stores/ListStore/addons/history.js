/* eslint-disable no-param-reassign */
import { types } from 'mobx-state-tree';
import { TimeTraveller } from 'mst-middlewares';

const addHistoryAddon = ({ targetPath } = {}) => ({
  model: {
    history: types.optional(TimeTraveller, {
      targetPath
    })
  },
  views: () => ({}),
  actions: () => ({}),
  itemModel: {},
  itemViews: () => ({}),
  itemActions: () => ({})
});

export default addHistoryAddon;
