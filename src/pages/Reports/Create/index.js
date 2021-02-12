import { Grid } from '@chakra-ui/react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import ReportCreationWizard from '../../../components/ReportCreationWizard';
import TransactionsTable from '../../../components/TransactionsTable';
import ReportStore from '../../../stores/ReportStore';

const reportStore = ReportStore.create({ id: uuid() });

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
      gridTemplateColumns="1fr auto"
      height="100%"
      overflow="hidden"
      columnGap="30px"
    >
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

export default Create;
