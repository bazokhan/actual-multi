import { types } from 'mobx-state-tree';

const TransactionStore = types.model('transaction', {
  id: types.identifier,
  amount: types.maybeNull(types.number),
  date: types.maybeNull(types.Date),
  notes: types.maybeNull(types.string),
  tombstone: types.maybeNull(types.number),
  created_at: types.maybeNull(types.Date),
  updated_at: types.maybeNull(types.Date)
});

export default TransactionStore;
