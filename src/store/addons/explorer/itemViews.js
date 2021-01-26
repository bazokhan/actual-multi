import { getParent } from 'mobx-state-tree';

export default self => ({
  get childItems() {
    const parent = getParent(self, 2);
    return parent.sortedItems.filter(
      item => item.parentID === self.id
    );
  },
  get parentFolder() {
    const itemsMap = getParent(self, 1);
    return (
      itemsMap.get(self.parentID) ||
      itemsMap.get('MAIN_WINDOW')
    );
  },
  get branch() {
    const allChildren = [];
    if (!self.childItems.length) return allChildren;
    return [
      ...allChildren,
      ...self.childItems,
      ...self.childItems.map(item => item.branch)
    ].flat();
  },
  get isRenamed() {
    const parent = getParent(self, 2);
    return parent.renamedItemID === self.id;
  },
  get isContextMenuTarget() {
    const parent = getParent(self, 2);
    return parent.contextMenuItemID === self.id;
  }
});
