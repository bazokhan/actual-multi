/* eslint-disable no-use-before-define */
import { types } from 'mobx-state-tree';
import TransactionStore from './Transaction.store';

const TransactionsAggregateStore = types.model(
  'transactions_aggregate',
  {
    aggregate: types.model({
      count: types.maybeNull(types.number)
    })
  }
);

const PayeeStore = types.model('payee', {
  id: types.identifier,
  name: types.maybeNull(types.string),
  // account: types.maybeNull(AccountStore),
  tombstone: types.maybeNull(types.number),
  transactions: types.optional(
    types.array(TransactionStore),
    []
  ),
  transactions_aggregate: types.maybeNull(
    TransactionsAggregateStore
  )
});

const AccountStore = types.model('account', {
  id: types.identifier,
  name: types.maybeNull(types.string),
  // owner: types.maybeNull(AccountStore),
  payee: types.maybeNull(PayeeStore),
  tombstone: types.maybeNull(types.number),
  transactions: types.optional(
    types.array(TransactionStore),
    []
  ),
  transactions_aggregate: types.maybeNull(
    TransactionsAggregateStore
  )
});

export default AccountStore;
