import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Spinner,
  Text,
  useColorMode
} from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import AccountStore from '../../../models/Account.store';
import select from '../../../helpers/select';
import ReportStore from '../../../stores/ReportStore';
import MultiSelect from '../../../components/MultiSelect';
import DatePicker from '../../../components/DatePicker';
import TransactionModel from '../store/TransactionModel';
import mapTDataToTStore from '../../../helpers/mapTDataToTStore';

const reportStore = ReportStore.create({ id: uuid() });

const ReportCreationWizard = ({
  isOpen,
  onConfirm,
  onCancel
}) => {
  const [step, setStep] = useState(0);

  const {
    data: accountsData,
    loading: accountsLoading,
    error: accountsError
  } = useQuery(select('accounts', AccountStore));

  const accounts = useMemo(() => accountsData?.accounts, [
    accountsData
  ]);

  useEffect(() => {
    reportStore.accounts.updateItems(accounts);
  }, [accounts]);

  const [
    transactionsQuery,
    { error, loading }
  ] = useLazyQuery(
    select(
      'transactions',
      TransactionModel,
      {
        transactions: {
          account: {
            id: {
              _in: '$accounts'
            }
          },
          date: {
            _gt: '$startDate',
            _lt: '$endDate'
          }
        }
      },
      '($accounts: [uuid!], $startDate: date, $endDate: date)'
    ),
    {
      onCompleted: nextData => {
        const properTransactions = nextData?.transactions?.map(
          mapTDataToTStore
        );
        reportStore.transactions.updateItems(
          properTransactions
        );
        setStep(step + 1);
      }
    }
  );

  const { colorMode } = useColorMode();

  if (!isOpen) return null;

  const step3 = (
    <Flex direction="column">
      {reportStore.transactions.categoryOptions.map(
        category => {
          const isChecked = reportStore.transactions.categoryFilter.includes(
            category.value.id
          );
          return (
            <Checkbox
              key={category.value.id}
              isChecked={isChecked}
              onChange={() => {
                reportStore.transactions.toggleCategoryFilter(
                  category
                );
              }}
            >
              {category.label}
            </Checkbox>
          );
        }
      )}
    </Flex>
  );

  const step4 = (
    <Flex direction="column">
      {reportStore.transactions.payeeOptions.map(payee => {
        const isChecked = reportStore.transactions.payeeFilter.includes(
          payee.value.id
        );
        return (
          <Checkbox
            key={payee.value.id}
            isChecked={isChecked}
            onChange={() => {
              reportStore.transactions.togglePayeeFilter(
                payee
              );
            }}
          >
            {payee.value?.name ||
              payee.value?.account?.name}
          </Checkbox>
        );
      })}
    </Flex>
  );

  const step0 = accountsError ? (
    <Text>Something went wrong!</Text>
  ) : accountsLoading ? (
    <Spinner />
  ) : (
    <>
      <MultiSelect
        title="Accounts"
        name="id"
        store={reportStore.accounts}
      />
    </>
  );

  const step1 = (
    <Grid
      gridTemplateRows="auto auto"
      rowGap="20px"
      padding="20px"
    >
      <Flex direction="column">
        <Text>Start Date: </Text>
        <Text
          margin="0 0 10px"
          fontWeight="bold"
          color={
            colorMode === 'light'
              ? 'main1.800'
              : 'main1.200'
          }
        >
          {reportStore.date.calendarStartDate.string}
        </Text>
        <DatePicker
          store={reportStore.date.calendarStartDate}
        />
      </Flex>
      <Flex direction="column">
        <Text>End Date: </Text>
        <Text
          margin="0 0 10px"
          fontWeight="bold"
          color={
            colorMode === 'light'
              ? 'main1.800'
              : 'main1.200'
          }
        >
          {reportStore.date.calendarEndDate.string}
        </Text>
        <DatePicker
          store={reportStore.date.calendarEndDate}
        />
      </Flex>
    </Grid>
  );

  const step2 = (
    <>
      <Text>Generating Report For:</Text>
      <Text>
        {reportStore.accounts.filteredByIdFilter
          .map(a => a.name)
          .join(', ')}
      </Text>
      <Text>
        {reportStore.date.calendarStartDate.string}
      </Text>
      <Text>{reportStore.date.calendarEndDate.string}</Text>
    </>
  );

  const step5 = <Text>Success. Close</Text>;

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
          {step === 0 ? step0 : null}
          {step === 1 ? step1 : null}
          {step === 2 ? step2 : null}
          {step === 3 ? step3 : null}
          {step === 4 ? step4 : null}
          {step === 5 ? step5 : null}
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
                  ? async () => {
                      await transactionsQuery({
                        variables: {
                          accounts: reportStore.accounts.filteredByIdFilter.map(
                            a => a.id
                          ),
                          startDate:
                            reportStore.date
                              .calendarStartDate.mdy,
                          endDate:
                            reportStore.date.calendarEndDate
                              .mdy
                        }
                      });
                    }
                  : step === 4
                  ? () => {
                      onConfirm({
                        transactions: reportStore.transactions.sortedItems.map(
                          getSnapshot
                        ),
                        loading,
                        error
                      });
                      setStep(step + 1);
                    }
                  : step === 5
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
