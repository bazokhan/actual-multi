import { Flex, Text, useColorMode } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import SortingButtons from '../SortingButtons';

const TableHeader = ({ store }) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Flex
        borderBottomColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderBottomWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text marginRight="5px">#</Text>
        <SortingButtons store={store} name="index" />
      </Flex>
      <Flex
        borderBottomColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderBottomWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text marginRight="5px">Date</Text>
        <SortingButtons store={store} name="date" />
      </Flex>
      <Flex
        borderBottomColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderBottomWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text marginRight="5px">Account</Text>
        <SortingButtons store={store} name="account" />
      </Flex>
      <Flex
        borderBottomColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderBottomWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text marginRight="5px">Payee</Text>
        <SortingButtons store={store} name="payee" />
      </Flex>
      <Flex
        borderBottomColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderBottomWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text marginRight="5px">Category</Text>
        <SortingButtons store={store} name="category" />
      </Flex>
      <Flex
        borderBottomColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderBottomWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text marginRight="5px">Notes</Text>
        <SortingButtons store={store} name="notes" />
      </Flex>
      <Flex
        borderBottomColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderBottomWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text marginRight="5px">Paid</Text>
        <SortingButtons store={store} name="paid" />
      </Flex>
      <Flex
        borderBottomColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderBottomWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text marginRight="5px">Recieved</Text>
        <SortingButtons store={store} name="recieved" />
      </Flex>
    </>
  );
};

TableHeader.propTypes = {
  store: PropTypes.object.isRequired
};

export default TableHeader;
