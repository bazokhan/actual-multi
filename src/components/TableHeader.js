import { Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import SortingButtons from './SortingButtons';

const TableHeader = ({ store }) => (
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
      <SortingButtons store={store} name="account" />
    </Flex>
    <Flex>
      <Text>Payee</Text>
      <SortingButtons store={store} name="payee" />
    </Flex>
    <Flex>
      <Text>Category</Text>
      <SortingButtons store={store} name="category" />
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
      <SortingButtons store={store} name="recieved" />
    </Flex>
  </>
);

TableHeader.propTypes = {
  store: PropTypes.object.isRequired
};

export default TableHeader;
