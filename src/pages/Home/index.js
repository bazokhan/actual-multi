import { Fragment, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Input,
  Select,
  Spinner,
  Text
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import insertOne from '../../helpers/insertOne';
import $ from '../../helpers/skipString';
import AccountStore from '../../models/Account.store';
import store from './store/TransactionsList';
import CustomTransactionsTable from './components/CustomTransactionsTable';
import select from '../../helpers/select';
import ReportStore from '../../stores/ReportStore';

// const AccountsList
const reportStore = ReportStore.create({ id: uuid() });

const Home = () => {
  const [insertAccountMutation] = useMutation(
    insertOne('accounts', AccountStore)
  );

  const { handleSubmit, register } = useForm();

  const onSubmit = async values => {
    await insertAccountMutation({
      variables: { accountsOne: values },
      update: (proxy, data) => console.log(data)
    });
  };

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

  return (
    <>
      {accountsError ? (
        <Text>Something went wrong!</Text>
      ) : accountsLoading ? (
        <Spinner />
      ) : (
        <>
          <Text>
            Selected Account:{' '}
            {reportStore.accounts?.filteredByIdFilter
              ?.map(account => account.name)
              ?.join(', ') || 'None'}
          </Text>
          <Flex direction="column">
            {reportStore.accounts.sortedItems.map(
              account => (
                <Checkbox
                  isChecked={reportStore.accounts.idFilter.includes(
                    account.id
                  )}
                  onChange={() => {
                    if (
                      reportStore.accounts.idFilter.includes(
                        account.id
                      )
                    ) {
                      reportStore.accounts.removeIdFilter(
                        account.id
                      );
                    } else {
                      reportStore.accounts.addIdFilter(
                        account.id
                      );
                    }
                  }}
                >
                  {account.name}
                </Checkbox>
              )
            )}
          </Flex>
          <Select
            onChange={e => {
              console.log(
                reportStore.accounts.idFilter,
                e.target.value
              );
              if (
                reportStore.accounts.idFilter.includes(
                  e.target.value
                )
              ) {
                console.log('Should remove');
                reportStore.accounts.removeIdFilter(
                  e.target.value
                );
              } else {
                reportStore.accounts.addIdFilter(
                  e.target.value
                );
              }
            }}
          >
            {reportStore.accounts.sortedItems.map(
              account => (
                <option
                  style={{ backgroundColor: '#1A202C' }}
                  value={account.id}
                  key={account.id}
                >
                  {account.name}
                </option>
              )
            )}
          </Select>
        </>
      )}
      <CustomTransactionsTable
        queryOptions={{
          transactions: {
            account: {
              name: { _eq: $`Telescan` },

              tombstone: { _eq: 0 }
            },
            date: {
              _gt: $`8/15/2020`,
              _lt: $`8/22/2020`
            },
            tombstone: { _eq: 0 }
          }
        }}
        store={store}
        tableSize={20}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="name">
          <Input id="name" name="name" ref={register} />
        </FormLabel>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default observer(Home);
