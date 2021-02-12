import PropTypes from 'prop-types';
import { Text, Spinner } from '@chakra-ui/react';
import MultiSelect from '../MultiSelect';

const AccountStoreSelectStep = ({
  error,
  loading,
  store
}) =>
  error ? (
    <Text>Something went wrong!</Text>
  ) : loading ? (
    <Spinner />
  ) : (
    <>
      <MultiSelect
        title="Accounts"
        name="id"
        store={store}
      />
    </>
  );

AccountStoreSelectStep.propTypes = {
  store: PropTypes.object.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool
};

AccountStoreSelectStep.defaultProps = {
  error: null,
  loading: false
};

export default AccountStoreSelectStep;
