import PropTypes from 'prop-types';
import { Grid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react';
import ReportCreationWizard from '../../../components/ReportCreationWizard';
import TransactionsTable from '../../../components/TransactionsTable';
import ReportStore from '../../../stores/ReportStore';

const reportStore = ReportStore.create({ id: uuid() });

const Chunk = observer(({ chunk, ...props }) =>
  chunk.chunked === 'Complete' ? (
    <Grid
      border="solid 1px green"
      gridTemplateRows="auto auto"
      gridColumn="2"
      {...props}
    >
      <Text>
        {chunk.prop.name} {chunk.identifier.name}
      </Text>
      <Text>Sum: {(chunk.sum / 100).toFixed(2)}</Text>
    </Grid>
  ) : (
    <Grid
      border="solid 1px red"
      gridTemplateColumns="1fr 1fr"
      columnGap="10px"
      gridColumn="1"
      {...props}
    >
      <Grid gridTemplateRows="auto auto">
        <Text>
          {chunk.prop.name} {chunk.identifier.name}
        </Text>
        <Text>Sum: {(chunk.sum / 100).toFixed(2)}</Text>
      </Grid>

      {chunk.chunked?.map(c => (
        <Chunk key={c.prop.name} chunk={c} />
      ))}
    </Grid>
  )
);

Chunk.propTypes = {
  chunk: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired
};

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onConfirm = async ({
    // transactions,
    loading: lazyLoading,
    error: lazyError
  }) => {
    // reportStore.transactions.updateItems(transactions);
    setLoading(lazyLoading);
    setError(lazyError);
  };
  const onCancel = () => {};

  return (
    <Grid
      gridTemplateColumns="auto 1fr auto"
      height="100%"
      overflow="hidden"
      columnGap="30px"
    >
      <Grid height="100%" minWidth="400px" overflow="auto">
        {reportStore.chunked === 'Complete'
          ? null
          : reportStore.chunked?.map(chunk => (
              <Chunk chunk={chunk} key={chunk.prop.name} />
            ))}
      </Grid>
      <TransactionsTable
        store={reportStore.transactions}
        loading={loading}
        error={error}
        tableSize={20}
      />
      <ReportCreationWizard
        store={reportStore}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </Grid>
  );
};

export default observer(Create);
