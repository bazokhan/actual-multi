import { flow } from 'mobx-state-tree';

/* eslint-disable no-param-reassign */
export default self => ({
  setRenamedItem: item => {
    self.renamedItemID = item?.id;
  },
  setDeletedItem: item => {
    self.deletedItemID = item?.id;
  },
  setContextMenuItem: (item, listName) => {
    self.contextMenuItemID = item?.id;
    self.contextMenuListName = listName;
  },
  navigateTo: (item, cb) => {
    if (item.isActive) return;
    self.selectItem(item);
    if (cb) {
      cb();
    }
  },
  moveItemToFolder: flow(function* moveItemToFolder(
    movedItemId,
    targetFolderId,
    mutate
  ) {
    const movedItem = self.itemsMap.get(movedItemId);
    const targetFolder = self.itemsMap.get(targetFolderId);
    if (!movedItem || !targetFolder) return;
    if (targetFolder.fileType !== 'folder') return;
    if (
      movedItem.branch
        .map(i => i.d)
        .includes(targetFolder.id)
    )
      return;
    if (mutate) {
      yield mutate();
    }
    movedItem.moveTo(targetFolder.id);
  }),
  setContextMenuPosition: newPos => {
    self.contextMenuPosition = newPos;
  },
  setSidebarOpen: bool => {
    self.sidebarOpen = bool;
  },
  toggleSidebarOpen: () => {
    self.sidebarOpen = !self.sidebarOpen;
  }
});
