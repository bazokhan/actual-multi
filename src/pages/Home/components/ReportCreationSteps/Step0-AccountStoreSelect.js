import PropTypes from 'prop-types';
import { Text, Spinner } from '@chakra-ui/react';
import MultiSelect from '../../../../components/MultiSelect';

const Step0 = ({ error, loading, store }) =>
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

Step0.propTypes = {
  store: PropTypes.object.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool
};

Step0.defaultProps = {
  error: null,
  loading: false
};

export default Step0;
