import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
// import { v4 as uuid } from 'uuid';
import { Grid, Text } from '@chakra-ui/react';
// import { clone } from 'mobx-state-tree';
// import TransactionRelationStore from '../../models/TransactionRelation.store';

const copy = transaction => ({
  ...transaction,
  account: !transaction.account
    ? null
    : { ...transaction.account },
  payee: !transaction.payee
    ? null
    : {
        ...transaction.payee,
        account: !transaction.payee.account
          ? null
          : { ...transaction.payee.account }
      },
  category: !transaction.category
    ? null
    : { ...transaction.category }
});

const ChunkSum = ({ chunk, total, mode, store }) => {
  const gridProps =
    mode === 'grid'
      ? {
          gridTemplateRows: 'repeat(3, auto)',
          rowGap: '5px',
          alignContent: 'start',
          borderRightColor: 'white',
          borderRightWidth: '1px'
        }
      : {
          gridTemplateColumns: 'auto auto 1fr',
          columnGap: '10px',
          justifyItems: 'end'
        };
  return (
    <Grid
      {...gridProps}
      onClick={() =>
        store.activeTransactions.updateItems(
          chunk.transactions.map(copy)
        )
      }
    >
      <Text>{chunk.prop.name}</Text>
      <Text fontWeight="bold">{chunk.identifier.name}</Text>
      <Text color={total < 0 ? 'red.500' : 'green.500'}>
        {total}
      </Text>
    </Grid>
  );
};

ChunkSum.propTypes = {
  chunk: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  store: PropTypes.object.isRequired,
  mode: PropTypes.string
};

ChunkSum.defaultProps = {
  mode: 'lines'
};

export default observer(ChunkSum);
