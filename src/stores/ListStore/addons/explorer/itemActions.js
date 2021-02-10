/* eslint-disable no-param-reassign */
import { getParent } from 'mobx-state-tree';

export default self => ({
  updateName: newName => {
    self.name = newName;
  },
  moveTo: folderId => {
    self.parentID = folderId;
  },
  changeNameInput: e => {
    self.newNameInput = e?.target?.value;
  },
  open: () => {
    const parent = getParent(self, 2);
    parent.navigateTo(self);
  },
  rename: async mutate => {
    const parent = getParent(self, 2);
    if (self.newNameInput === self.name) {
      parent.setRenamedItem(null);
      return;
    }
    await mutate(self.id, self.newNameInput);
    self.updateName(self.newNameInput);
    parent.setRenamedItem(null);
  },
  openRename: async () => {
    const parent = getParent(self, 2);
    parent.setRenamedItem(self);
  }
});
