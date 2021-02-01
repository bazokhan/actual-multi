import { types } from 'mobx-state-tree';
import TransactionStore from './Transaction.store';

const AccountStore = types.model('Account', {
  id: types.identifier,
  transactions: types.optional(
    types.array(TransactionStore),
    []
  )
});

export default AccountStore;
