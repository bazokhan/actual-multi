import { Fragment, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  FormLabel,
  Grid,
  Input,
  Spinner,
  Text
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { types } from 'mobx-state-tree';
import insertOne from '../../helpers/insertOne';
import $ from '../../helpers/skipString';
import select from '../../helpers/select';
import AccountStore from '../../models/Account.store';
import extend from '../../helpers/extend';
import usePagination from '../../hooks/usePagination';
import TransactionModel from './store/TransactionModel';
import store from './store';
import TableHeader from './components/TableHeader';
import TableRow from './components/TableRow';
import TableNavigation from './components/TableNavigation';

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

  const { data, loading, error } = useQuery(
    select(
      'accounts',
      extend(AccountStore, {
        transactions: types.optional(
          types.array(TransactionModel),
          []
        )
      }),
      {
        accounts: { name: { _eq: $`Telescan` } },
        transactions: { tombstone: { _eq: 0 } }
      }
    )
  );

  const transactions = useMemo(
    () => data?.accounts?.[0]?.transactions || [],
    [data]
  );

  useEffect(() => {
    store.updateItems(
      transactions.map((t, index) => ({
        ...t,
        date: new Date(t.date),
        created_at: new Date(t.created_at),
        updated_at: new Date(t.updated_at),
        index
      }))
    );
  }, [transactions]);

  const {
    activePageData,
    ...navigationProps
  } = usePagination({
    data: store.sortedItems,
    tableSize: 50
  });

  return (
    <>
      <Grid
        gridTemplateColumns="repeat(8, 1fr)"
        height="100%"
        overflowY="auto"
      >
        {error ? (
          <Text>Something went wrong</Text>
        ) : loading ? (
          <Spinner />
        ) : (
          <>
            <TableHeader store={store} />
            {activePageData.map(item => (
              <TableRow key={item.id} item={item} />
            ))}
          </>
        )}
      </Grid>
      <TableNavigation {...navigationProps} />
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
