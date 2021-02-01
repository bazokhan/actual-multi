import { types } from 'mobx-state-tree';

const TransactionStore = types.model('transaction', {
  id: types.identifier,
  amount: types.maybeNull(types.number)
});

export default TransactionStore;
