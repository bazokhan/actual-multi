import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useColorMode
} from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import ReportStore from '../../../stores/ReportStore';
import mapTDataToTStore from '../../../helpers/mapTDataToTStore';
import Step0 from './ReportCreationSteps/Step0-AccountStoreSelect';
import Step1 from './ReportCreationSteps/Step1-DateStore';
import Step2 from './ReportCreationSteps/Step2-ReportStore';
import Step3 from './ReportCreationSteps/Step3-TStoreSelectCategory';
import Step4 from './ReportCreationSteps/Step4-TStoreSelectPayee';
import Step5 from './ReportCreationSteps/Step5-Success';
import useReportLazyQueries from '../hooks/useReportLazyQueries';
import useAccounts from '../hooks/useAccounts';

const reportStore = ReportStore.create({ id: uuid() });

const ReportCreationWizard = ({
  isOpen,
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
      reportStore.transactions.updateItems(
        properTransactions
      );
      setStep(step + 1);
    },
    onAggregateQueryCompleted: nextData => {
      console.log(nextData);
    }
  });

  const {
    accounts,
    loading: accountsLoading,
    error: accountsError
  } = useAccounts();

  useEffect(() => {
    reportStore.accounts.updateItems(accounts);
  }, [accounts]);

  const { colorMode } = useColorMode();

  const onAccountDateSelection = async () => {
    await transactionsQuery({
      variables: {
        accounts: reportStore.accounts.filteredByIdFilter.map(
          a => a.id
        ),
        startDate: reportStore.date.calendarStartDate.mdy,
        endDate: reportStore.date.calendarEndDate.mdy
      }
    });
  };

  const onCategoryPayeeSelection = async () => {
    await transactionsAggregateQuery({
      variables: {
        accounts: reportStore.accounts.filteredByIdFilter.map(
          a => a.id
        ),
        startDate: reportStore.date.calendarStartDate.mdy,
        endDate: reportStore.date.calendarEndDate.mdy,
        categories: reportStore.transactions.categoryFilter,
        payees: reportStore.transactions.payeeFilter
      }
    });
    setStep(step + 1);
  };

  const onAggregateQuery = () => {
    onConfirm({
      transactions: reportStore.transactions.sortedItems.map(
        getSnapshot
      ),
      loading: transactionsLoading,
      error: transactionsError
    });
    setStep(step + 1);
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onCancel}
      closeOnOverlayClick={false}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent
        bg={colorMode === 'light' ? 'bg.200' : 'bg.800'}
      >
        <DrawerCloseButton />
        <DrawerHeader>Create Report</DrawerHeader>

        <DrawerBody>
          {step === 0 ? (
            <Step0
              loading={accountsLoading}
              error={accountsError}
              store={reportStore.accounts}
            />
          ) : null}
          {step === 1 ? (
            <Step1 store={reportStore.date} />
          ) : null}
          {step === 2 ? (
            <Step2 store={reportStore} />
          ) : null}
          {step === 3 ? (
            <Step3 store={reportStore.transactions} />
          ) : null}
          {step === 4 ? (
            <Step4 store={reportStore.transactions} />
          ) : null}
          {step === 5 ? <Step5 /> : null}
        </DrawerBody>

        <DrawerFooter>
          <Flex width="100%" justifyContent="space-between">
            <Button
              onClick={
                step === 0
                  ? onCancel
                  : () => setStep(step - 1)
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

ReportCreationWizard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default observer(ReportCreationWizard);
