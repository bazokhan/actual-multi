import { types } from 'mobx-state-tree';

export default {
  renamedItemID: types.maybeNull(types.string),
  deletedItemID: types.maybeNull(types.string),
  contextMenuItemID: types.maybeNull(types.string),
  contextMenuListName: types.maybeNull(types.string),
  contextMenuPosition: types.optional(
    types.model('Position', {
      x: 0,
      y: 0
    }),
    {}
  ),
  sidebarOpen: true
};
