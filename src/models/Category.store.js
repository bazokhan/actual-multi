import { types } from 'mobx-state-tree';

const CategoryStore = types.model('category', {
  id: types.identifier,
  name: types.maybeNull(types.string),
  tombstone: types.maybeNull(types.number)
});

export default CategoryStore;
