import { useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  FormLabel,
  Grid,
  Input,
  Text
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import insertOne from '../../helpers/insertOne';
import $ from '../../helpers/skipString';
import select from '../../helpers/select';
import AccountStore from '../../models/Account.store';
import TransactionStore from '../../models/Transaction.store';
import generate from '../../store';
import EditableDiv from '../../ui/EditableDiv';
import SelectableDiv from '../../ui/SelectableDiv';

const TransactionsList = generate(TransactionStore);

const store = TransactionsList.create({});

console.log(store);

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

  // const { data, loading, error } = useQuery(
  //   select('accounts', AccountStore)
  // );

  const { data, loading, error } = useQuery(
    select('accounts', AccountStore, {
      accounts: { name: { _eq: $`Telescan` } }
    })
  );

  console.log(data, loading, error);

  const transactions = useMemo(
    () => data?.accounts?.[0]?.transactions || [],
    [data]
  );

  useEffect(() => {
    store.updateItems(transactions);
  }, [transactions]);

  console.log(store.sortedItems);

  return (
    <>
      <Grid
        gridTemplateColumns="repeat(8, 1fr)"
        height="100%"
        overflowY="auto"
      >
        {store.sortedItems.map((item, index) => (
          <>
            <Text>{index}</Text>
            <Text>{item.date?.toLocaleString()}</Text>
            <SelectableDiv
              options={[{ label: 'Hi', value: 'hello' }]}
            >
              <Text>{item.account?.name}</Text>
            </SelectableDiv>
            <SelectableDiv
              options={[{ label: 'Hi', value: 'hello' }]}
            >
              <Text>{item.payee?.name}</Text>
            </SelectableDiv>
            <SelectableDiv
              options={[{ label: 'Hi', value: 'hello' }]}
            >
              <Text>{item.category?.name}</Text>
            </SelectableDiv>
            <EditableDiv
              onSubmit={() => {}}
              defaultValue={item.notes}
            />
            <EditableDiv
              onSubmit={() => {}}
              defaultValue={`${item.amount}`}
            />
            <EditableDiv
              onSubmit={() => {}}
              defaultValue={`${item.amount}`}
            />
          </>
        ))}
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
