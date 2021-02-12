import { types } from 'mobx-state-tree';
import TransactionRelationStore from './TransactionRelation.store';

const TransactionsAggregateStore = types.model(
  'transactions_aggregate',
  {
    aggregate: types.model({
      count: types.maybeNull(types.number),
      sum: types.model({
        amount: types.maybeNull(types.number)
      })
    }),
    nodes: types.optional(
      types.array(TransactionRelationStore),
      []
    )
  }
);

export default TransactionsAggregateStore;
