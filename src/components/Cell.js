import PropTypes from 'prop-types';
import { Spinner, Text } from '@chakra-ui/react';

const Cell = ({ error, loading, children }) =>
  error ? (
    <Text>Something went wrong!</Text>
  ) : loading ? (
    <Spinner />
  ) : (
    children
  );

Cell.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Cell.defaultProps = {
  error: null,
  loading: false
};

export default Cell;
