import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  Box,
  Flex,
  Heading,
  useColorMode
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import Step0 from './ReportCreationSteps/AccountStoreSelect';
import Step1 from './ReportCreationSteps/DateStore';
import Step2 from './ReportCreationSteps/ReportStore';
import Step3 from './ReportCreationSteps/TStoreSelectCategory';
import Step4 from './ReportCreationSteps/TStoreSelectPayee';
import Step5 from './ReportCreationSteps/SuccessMessage';
import mapTDataToTStore from '../helpers/mapTDataToTStore';
import useReportLazyQueries from '../hooks/useReportLazyQueries';
import useAccounts from '../hooks/useAccounts';

const ReportCreationWizard = ({
  store,
  onConfirm,
  onCancel
}) => {
  const [step, setStep] = useState(0);

  const {
    transactionsQuery,
    transactionsError,
    transactionsLoading,
    transactionsAggregateQuery
  } = useReportLazyQueries({
    onTransactionsQueryCompleted: nextData => {
      const properTransactions = nextData?.transactions?.map(
        mapTDataToTStore
      );
      store.transactions.updateItems(properTransactions);
      setStep(step + 1);
    },
    onAggregateQueryCompleted: nextData => {
      // eslint-disable-next-line no-console
      console.log(nextData);
    }
  });

  const {
    accounts,
    loading: accountsLoading,
    error: accountsError
  } = useAccounts();

  useEffect(() => {
    store.accounts.updateItems(accounts);
  }, [accounts, store.accounts]);

  const { colorMode } = useColorMode();

  const onAccountDateSelection = async () => {
    await transactionsQuery({
      variables: {
        accounts: store.accounts.filteredByIdFilter.map(
          a => a.id
        ),
        startDate: store.date.calendarStartDate.mdy,
        endDate: store.date.calendarEndDate.mdy
      }
    });
  };

  const onCategoryPayeeSelection = async () => {
    await transactionsAggregateQuery({
      variables: {
        accounts: store.accounts.filteredByIdFilter.map(
          a => a.id
        ),
        startDate: store.date.calendarStartDate.mdy,
        endDate: store.date.calendarEndDate.mdy,
        categories: store.transactions.categoryFilter,
        payees: store.transactions.payeeFilter
      }
    });
    setStep(step + 1);
  };

  const onAggregateQuery = () => {
    onConfirm({
      transactions: store.transactions.sortedItems.map(
        getSnapshot
      ),
      loading: transactionsLoading,
      error: transactionsError
    });
    setStep(step + 1);
  };

  return (
    <Grid
      width="400px"
      height="100%"
      padding="20px"
      borderColor={
        colorMode === 'light' ? 'bg.300' : 'bg.700'
      }
      borderWidth="1px"
      bg={colorMode === 'light' ? 'bg.200' : 'bg.800'}
      gridTemplateRows="auto 1fr auto"
      rowGap="20px"
      overflowY="hidden"
    >
      <Heading>Create Report</Heading>

      <Box height="100%" overflowY="auto">
        {step === 0 ? (
          <Step0
            loading={accountsLoading}
            error={accountsError}
            store={store.accounts}
          />
        ) : null}
        {step === 1 ? <Step1 store={store.date} /> : null}
        {step === 2 ? <Step2 store={store} /> : null}
        {step === 3 ? (
          <Step3 store={store.transactions} />
        ) : null}
        {step === 4 ? (
          <Step4 store={store.transactions} />
        ) : null}
        {step === 5 ? <Step5 /> : null}
      </Box>

      <Flex width="100%" justifyContent="space-between">
        <Button
          onClick={
            step === 0 ? onCancel : () => setStep(step - 1)
          }
        >
          Previous
        </Button>
        <Button
          onClick={
            step === 2
              ? onAccountDateSelection
              : step === 4
              ? onCategoryPayeeSelection
              : step === 5
              ? onAggregateQuery
              : step === 6
              ? onCancel
              : () => setStep(step + 1)
          }
        >
          Next
        </Button>
      </Flex>
    </Grid>
  );
};

ReportCreationWizard.propTypes = {
  store: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default observer(ReportCreationWizard);
