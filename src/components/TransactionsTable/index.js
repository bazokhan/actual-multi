import PropTypes from 'prop-types';
import { Grid } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableNavigation from './TableNavigation';
import TableTotalRow from './TableTotalRow';
import Cell from '../Cell';
import usePagination from '../../hooks/usePagination';

const TransactionsTable = ({
  store,
  loading,
  error,
  tableSize,
  ...props
}) => {
  const {
    activePageData,
    ...navigationProps
  } = usePagination({
    data: store.sortedItems,
    tableSize
  });

  return (
    <Grid
      gridTemplateRows="auto 1fr auto"
      height="100%"
      overflowY="hidden"
      {...props}
    >
      <Grid gridTemplateColumns="repeat(8, 1fr)">
        <Cell error={error} loading={loading}>
          <TableHeader store={store} />
        </Cell>
      </Grid>
      <Grid
        gridTemplateColumns="repeat(8, 1fr)"
        overflowY="auto"
        alignItems="start"
        alignContent="start"
      >
        <Cell error={error} loading={loading}>
          {activePageData.map(item => (
            <TableRow key={item.id} item={item} />
          ))}
        </Cell>
      </Grid>
      <Grid gridTemplateColumns="repeat(8, 1fr)">
        <Cell error={error} loading={loading}>
          <TableTotalRow store={store} />
          <TableNavigation
            gridColumn="1 / 9"
            {...navigationProps}
          />
        </Cell>
      </Grid>
    </Grid>
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
