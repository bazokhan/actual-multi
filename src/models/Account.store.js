import { types } from 'mobx-state-tree';

const AccountStore = types.model('account', {
  id: types.identifier,
  name: types.maybeNull(types.string),
  tombstone: types.maybeNull(types.number)
});

export default AccountStore;
