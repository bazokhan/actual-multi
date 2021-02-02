import { types } from 'mobx-state-tree';

const PayeeStore = types.model('payee', {
  id: types.identifier,
  name: types.maybeNull(types.string),
  // account: types.maybeNull(AccountStore),
  tombstone: types.maybeNull(types.number)
  // transactions: types.optional(
  //   types.array(TransactionStore),
  //   []
  // ),
  // transactions_aggregate: types.maybeNull(
  //   TransactionsAggregateStore
  // )
});

export default PayeeStore;
