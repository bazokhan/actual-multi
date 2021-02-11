import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { observer } from 'mobx-react';
import mapTDataToTStore from '../../../helpers/mapTDataToTStore';
import TransactionsTable from './TransactionsTable';

const TransactionsTableCell = ({
  gql,
  tableSize,
  store,
  ...props
}) => {
  const { data, loading, error } = useQuery(gql);

  const transactions = useMemo(
    () => data?.transactions || [],
    [data]
  );

  useEffect(() => {
    store.updateItems(transactions.map(mapTDataToTStore));
  }, [store, transactions]);

  return (
    <TransactionsTable
      loading={loading}
      error={error}
      store={store}
      tableSize={tableSize}
      {...props}
    />
  );
};

TransactionsTableCell.propTypes = {
  gql: PropTypes.string.isRequired,
  tableSize: PropTypes.number.isRequired,
  store: PropTypes.object.isRequired
};

export default observer(TransactionsTableCell);
