import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Button,
  FormLabel,
  Input,
  useColorMode
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import insertOne from '../../helpers/insertOne';
// import $ from '../../helpers/skipString';
import AccountStore from '../../models/Account.store';
import store from './store/TransactionsList';
// import TransactionsTableCell from './components/TransactionsTableCell';
import ReportCreationWizard from './components/ReportCreationWizard';
// import TransactionModel from './store/TransactionModel';
// import select from '../../helpers/select';
import TransactionsTable from './components/TransactionsTable';

const Home = () => {
  const [insertAccountMutation] = useMutation(
    insertOne('accounts', AccountStore)
  );

  const { handleSubmit, register } = useForm();

  const onSubmit = async values => {
    await insertAccountMutation({
      variables: { accountsOne: values },
      // eslint-disable-next-line no-console
      update: (proxy, data) => console.log(data)
    });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const onConfirm = async ({
    transactions,
    loading: lazyLoading,
    error: lazyError
  }) => {
    store.updateItems(transactions);
    setLoading(lazyLoading);
    setError(lazyError);
  };
  const onCancel = () => {
    setIsOpen(false);
  };

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <Button onClick={() => setIsOpen(true)}>
        Create Report
      </Button>
      <ReportCreationWizard
        isOpen={isOpen}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
      <TransactionsTable
        store={store}
        loading={loading}
        error={error}
        tableSize={20}
      />
      {/* <TransactionsTableCell
        gql={select('transactions', TransactionModel, {
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
        })}
        store={store}
        tableSize={20}
      /> */}
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
