import { types } from 'mobx-state-tree';

const PayeeStore = types.model('payee', {
  id: types.identifier,
  name: types.maybeNull(types.string),
  tombstone: types.maybeNull(types.number)
});

export default PayeeStore;
