import { types } from 'mobx-state-tree';

const TransactionsAggregateStore = types.model(
  'transactions_aggregate',
  {
    aggregate: types.model({
      count: types.maybeNull(types.number)
    })
  }
);

export default TransactionsAggregateStore;
