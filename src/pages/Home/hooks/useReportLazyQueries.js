import { useLazyQuery } from '@apollo/client';
import { types } from 'mobx-state-tree';
import select from '../../../helpers/select';
import TransactionModel from '../store/TransactionModel';
import TransactionsAggregateStore from '../../../models/TransactionsAggregate.store';
import extend from '../../../helpers/extend';

const queryFunctionParams =
  '($accounts: [uuid!], $startDate: date, $endDate: date)';

const queryParams = {
  transactions: {
    account: {
      id: {
        _in: '$accounts'
      }
    },
    date: {
      _gt: '$startDate',
      _lt: '$endDate'
    }
  }
};

const aggQueryFunctionParams =
  '($accounts: [uuid!], $categories: [uuid!], $payees: [uuid!], $startDate: date, $endDate: date)';

const aggQueryParams = {
  transactions_aggregate: {
    account: {
      id: {
        _in: '$accounts'
      }
    },
    date: {
      _gt: '$startDate',
      _lt: '$endDate'
    },
    category: {
      id: {
        _in: '$categories'
      }
    },
    payee: {
      id: {
        _in: '$payees'
      }
    }
  }
};

const useReportLazyQueries = ({
  onTransactionsQueryCompleted,
  onAggregateQueryCompleted
}) => {
  const [
    transactionsQuery,
    {
      error: transactionsError,
      loading: transactionsLoading
    }
  ] = useLazyQuery(
    select(
      'transactions',
      TransactionModel,
      queryParams,
      queryFunctionParams
    ),
    {
      fetchPolicy: 'no-cache',
      onCompleted: nextData => {
        onTransactionsQueryCompleted(nextData);
      }
    }
  );

  const [
    transactionsAggregateQuery,
    { error: aggregateError, loading: aggregateLoading }
  ] = useLazyQuery(
    select(
      'transactions_aggregate',
      extend(TransactionsAggregateStore, {
        aggregate: types.model({
          sum: types.model({
            amount: types.maybeNull(types.number)
          })
        }),
        nodes: types.optional(
          types.array(TransactionModel),
          []
        )
      }),
      aggQueryParams,
      aggQueryFunctionParams
    ),
    {
      fetchPolicy: 'no-cache',
      onCompleted: nextData => {
        onAggregateQueryCompleted(nextData);
      }
    }
  );

  return {
    transactionsQuery,
    transactionsError,
    transactionsLoading,
    transactionsAggregateQuery,
    aggregateError,
    aggregateLoading
  };
};

export default useReportLazyQueries;
