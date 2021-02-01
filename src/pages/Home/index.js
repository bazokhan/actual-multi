import { useMutation } from '@apollo/client';
import { Button, FormLabel, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import insertOne from '../../helpers/insertOne';
import AccountStore from '../../models/Account.store';

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

  // console.log(insertAccountMutation);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="name">
        <Input id="name" name="name" ref={register} />
      </FormLabel>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Home;
