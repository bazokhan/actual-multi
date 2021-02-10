import { Fragment, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { Grid, Spinner, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import select from '../../../helpers/select';
import usePagination from '../../../hooks/usePagination';
import TransactionModel from '../store/TransactionModel';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableNavigation from './TableNavigation';

const CustomTransactionsTable = ({
  queryOptions,
  tableSize,
  store
}) => {
  const { data, loading, error } = useQuery(
    select('transactions', TransactionModel, queryOptions)
  );

  const transactions = useMemo(
    () => data?.transactions || [],
    [data]
  );

  useEffect(() => {
    store.updateItems(
      transactions.map((t, index) => ({
        ...t,
        date: new Date(t.date),
        created_at: new Date(t.created_at),
        updated_at: new Date(t.updated_at),
        index
      }))
    );
  }, [store, transactions]);

  const {
    activePageData,
    ...navigationProps
  } = usePagination({
    data: store.sortedItems,
    tableSize
  });

  return (
    <>
      <Grid
        gridTemplateColumns="repeat(8, 1fr)"
        height="100%"
        overflowY="auto"
      >
        {error ? (
          <Text>Something went wrong</Text>
        ) : loading ? (
          <Spinner />
        ) : (
          <>
            <TableHeader store={store} />
            {activePageData.map(item => (
              <TableRow key={item.id} item={item} />
            ))}
          </>
        )}
      </Grid>
      <TableNavigation {...navigationProps} />
    </>
  );
};

CustomTransactionsTable.propTypes = {
  queryOptions: PropTypes.object.isRequired,
  tableSize: PropTypes.number.isRequired,
  store: PropTypes.object.isRequired
};

export default observer(CustomTransactionsTable);
