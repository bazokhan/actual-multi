import { types } from 'mobx-state-tree';

const AccountStore = types.model('account', {
  id: types.identifier,
  name: types.maybeNull(types.string),
  // owner: types.maybeNull(AccountStore),
  // payee: types.maybeNull(PayeeStore),
  tombstone: types.maybeNull(types.number)
  // transactions: types.optional(
  //   types.array(TransactionStore),
  //   []
  // ),
  // transactions_aggregate: types.maybeNull(
  //   TransactionsAggregateStore
  // )
});

export default AccountStore;
