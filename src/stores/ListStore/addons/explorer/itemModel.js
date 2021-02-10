import { types } from 'mobx-state-tree';

export default fileTypes => ({
  name: types.maybeNull(types.string),
  parentID: types.maybeNull(types.string),
  fileType: types.maybeNull(
    types.enumeration(fileTypes || ['file', 'folder'])
  ),
  newNameInput: types.maybeNull(types.string)
});
