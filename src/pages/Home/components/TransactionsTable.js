import PropTypes from 'prop-types';
import { Grid, Spinner, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import usePagination from '../../../hooks/usePagination';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableNavigation from './TableNavigation';

const TransactionsTable = ({
  store,
  loading,
  error,
  tableSize
}) => {
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

TransactionsTable.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  tableSize: PropTypes.number.isRequired,
  store: PropTypes.object.isRequired
};

TransactionsTable.defaultProps = {
  loading: false,
  error: null
};

export default observer(TransactionsTable);
