import { types } from 'mobx-state-tree';

const TransactionStore = types.model('Transaction', {
  id: types.identifier,
  amount: types.optional(types.number, 0)
});

export default TransactionStore;
