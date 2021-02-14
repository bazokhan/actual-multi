import { useMutation } from '@apollo/client';
import {
  Avatar,
  Button,
  Flex,
  FormLabel,
  Grid,
  Input,
  Text
  // useColorMode
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import insertOne from '../../helpers/insertOne';
import AccountStore from '../../models/Account.store';
import Cell from '../../components/Cell';
import useAccounts from '../../hooks/useAccounts';

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

  // const { colorMode, toggleColorMode } = useColorMode();

  const {
    accounts,
    loading: accountsLoading,
    error: accountsError
  } = useAccounts();

  return (
    <>
      <Cell loading={accountsLoading} error={accountsError}>
        <Flex flexWrap="wrap">
          {accounts?.map(account => (
            <Link to={`/accounts/${account.id}`}>
              <Grid
                gridTemplateRows="auto auto"
                rowGap="10px"
                padding="20px"
                boxShadow="md"
                justifyContent="center"
                justifyItems="center"
                width="150px"
                margin="10px"
              >
                <Avatar
                  name={account.name}
                  src={account.picture}
                />
                <Text>{account.name}</Text>
              </Grid>
            </Link>
          ))}
        </Flex>
      </Cell>

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
