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
import AccountStoreSelectStep from './ReportCreationSteps/AccountStoreSelect';
import DateStoreStep from './ReportCreationSteps/DateStore';
// import ReportStoreStep from './ReportCreationSteps/ReportStore';
import TStoreSelectCategoryStep from './ReportCreationSteps/TStoreSelectCategory';
import TStoreSelectPayeeStep from './ReportCreationSteps/TStoreSelectPayee';
import SuccessMessageStep from './ReportCreationSteps/SuccessMessage';
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
      const properTransactions = nextData?.transactions_aggregate?.nodes?.map(
        mapTDataToTStore
      );
      store.transactions.updateItems(properTransactions);
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
  };

  const steps = [
    {
      id: 0,
      component: (
        <AccountStoreSelectStep
          loading={accountsLoading}
          error={accountsError}
          store={store.accounts}
        />
      ),
      onNext: () => setStep(step + 1),
      onPrev: onCancel
    },
    {
      id: 1,
      component: <DateStoreStep store={store.date} />,
      onNext: onAccountDateSelection,
      onPrev: () => setStep(step - 1)
    },
    {
      id: 2,
      component: (
        <TStoreSelectCategoryStep
          store={store.transactions}
        />
      ),
      onNext: () => setStep(step + 1),
      onPrev: () => setStep(step - 1)
    },
    {
      id: 3,
      component: (
        <TStoreSelectPayeeStep store={store.transactions} />
      ),
      onNext: onCategoryPayeeSelection,
      onPrev: () => setStep(step - 1)
    },
    {
      id: 4,
      component: <SuccessMessageStep />,
      onNext: onAggregateQuery,
      onPrev: () => setStep(step - 1)
    }
  ];

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
        {steps[step].component}
      </Box>

      <Flex width="100%" justifyContent="space-between">
        <Button onClick={steps[step].onPrev}>
          Previous
        </Button>
        <Button onClick={steps[step].onNext}>Next</Button>
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
