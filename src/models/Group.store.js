import { types } from 'mobx-state-tree';

const GroupStore = types.model('group', {
  id: types.identifier,
  name: types.maybeNull(types.string),
  tombstone: types.maybeNull(types.number)
});

export default GroupStore;
