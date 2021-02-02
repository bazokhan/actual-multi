import { Fragment, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Flex,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Spinner,
  Text
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { types } from 'mobx-state-tree';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@chakra-ui/icons';
import insertOne from '../../helpers/insertOne';
import $ from '../../helpers/skipString';
import select from '../../helpers/select';
import AccountStore from '../../models/Account.store';
import TransactionStore from '../../models/Transaction.store';
import generate from '../../store';
import EditableDiv from '../../ui/EditableDiv';
import SelectableDiv from '../../ui/SelectableDiv';
import extend from '../../helpers/extend';
import CategoryStore from '../../models/Category.store';
import PayeeStore from '../../models/Payee.store';
import usePagination from '../../hooks/usePagination';
import formatDate from '../../helpers/formatDate';
import SortingButtons from '../../components/SortingButtons';

const TransactionModel = extend(TransactionStore, {
  account: types.maybeNull(AccountStore),
  category: types.maybeNull(CategoryStore),
  payee: types.maybeNull(
    extend(PayeeStore, {
      account: types.maybeNull(AccountStore)
    })
  )
});

const TransactionsList = generate(
  extend(TransactionModel, {
    index: types.maybeNull(types.number)
  }),
  {
    sortFilters: [
      {
        name: 'index',
        type: 'number',
        getter: item => item.index
      },
      {
        name: 'date',
        type: 'date',
        getter: item => item.date
      },
      {
        name: 'account',
        type: 'string',
        getter: item => item.account?.name
      },
      {
        name: 'payee',
        type: 'string',
        getter: item =>
          item.payee?.name || item.payee?.account?.name
      },
      {
        name: 'category',
        type: 'string',
        getter: item => item.category?.name
      },
      {
        name: 'notes',
        type: 'string',
        getter: item => item.notes
      },
      {
        name: 'paid',
        type: 'number',
        getter: item =>
          item.amount < 0 ? item.amount : null
      },
      {
        name: 'recieved',
        type: 'number',
        getter: item =>
          item.amount >= 0 ? item.amount : null
      }
    ]
  }
);

const store = TransactionsList.create({});

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
    pageNumber,
    totalPagesNumber,
    isFirstPage,
    isLastPage,
    getLastPage,
    getFirstPage,
    getPrevPage,
    getNextPage
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
            <Flex>
              <Text>#</Text>
              <SortingButtons store={store} name="index" />
            </Flex>
            <Flex>
              <Text>Date</Text>
              <SortingButtons store={store} name="date" />
            </Flex>
            <Flex>
              <Text>Account</Text>
              <SortingButtons
                store={store}
                name="account"
              />
            </Flex>
            <Flex>
              <Text>Payee</Text>
              <SortingButtons store={store} name="payee" />
            </Flex>
            <Flex>
              <Text>Category</Text>
              <SortingButtons
                store={store}
                name="category"
              />
            </Flex>
            <Flex>
              <Text>Notes</Text>
              <SortingButtons store={store} name="notes" />
            </Flex>
            <Flex>
              <Text>Paid</Text>
              <SortingButtons store={store} name="paid" />
            </Flex>
            <Flex>
              <Text>Recieved</Text>
              <SortingButtons
                store={store}
                name="recieved"
              />
            </Flex>
            {activePageData.map(item => (
              <Fragment key={item.id}>
                <Text>{item.index}</Text>
                <Text>{formatDate(item.date)}</Text>
                <SelectableDiv
                  defaultValue={item.account?.name}
                  onChange={() => {}}
                  options={[
                    { label: 'Hi', value: 'hello' }
                  ]}
                >
                  <Text>{item.account?.name}</Text>
                </SelectableDiv>
                <SelectableDiv
                  defaultValue={
                    item.payee?.name ||
                    item.payee?.account?.name
                  }
                  onChange={() => {}}
                  options={[
                    { label: 'Hi', value: 'hello' }
                  ]}
                >
                  <Text>
                    {item.payee?.name ||
                      item.payee?.account?.name}
                  </Text>
                </SelectableDiv>
                <SelectableDiv
                  defaultValue={item.category?.name}
                  onChange={() => {}}
                  options={[
                    { label: 'Hi', value: 'hello' }
                  ]}
                >
                  <Text>{item.category?.name}</Text>
                </SelectableDiv>
                <EditableDiv
                  onSubmit={() => {}}
                  defaultValue={item.notes}
                />
                <EditableDiv
                  onSubmit={() => {}}
                  defaultValue={
                    item.amount < 0
                      ? `${(item.amount / 100).toFixed(2)}`
                      : ''
                  }
                />
                <EditableDiv
                  onSubmit={() => {}}
                  defaultValue={
                    item.amount >= 0
                      ? `${(item.amount / 100).toFixed(2)}`
                      : ''
                  }
                />
              </Fragment>
            ))}
          </>
        )}
      </Grid>
      <Grid
        gridTemplateColumns="auto auto 1fr auto auto"
        height="100%"
        overflowY="auto"
      >
        <IconButton
          colorScheme="gray"
          onClick={getFirstPage}
          isDisabled={isFirstPage}
          icon={<ArrowLeftIcon />}
        />
        <IconButton
          colorScheme="gray"
          onClick={getPrevPage}
          isDisabled={isFirstPage}
          icon={<ChevronLeftIcon />}
        />
        <Text>
          Page {pageNumber} of {totalPagesNumber}
        </Text>
        <IconButton
          colorScheme="gray"
          onClick={getNextPage}
          isDisabled={isLastPage}
          icon={<ChevronRightIcon />}
        />
        <IconButton
          colorScheme="gray"
          onClick={getLastPage}
          isDisabled={isLastPage}
          icon={<ArrowRightIcon />}
        />
      </Grid>
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
