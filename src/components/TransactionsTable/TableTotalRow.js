import { Flex, Text, useColorMode } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import sum from '../../helpers/sum';

const TableTotalRow = ({ store }) => {
  useEffect(() => {
    if (!store.paidFilter) {
      store.togglePaidFilter();
    }
    if (!store.recievedFilter) {
      store.toggleRecievedFilter();
    }
  }, [store]);

  const paid = sum(store.filteredByPaidFilter);
  const recieved = sum(store.filteredByRecievedFilter);
  const { colorMode } = useColorMode();

  return (
    <>
      <Flex
        borderTopColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderTopWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Total</Text>
      </Flex>
      <Flex
        borderTopColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderTopWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text>{((paid + recieved) / 100).toFixed(2)}</Text>
      </Flex>
      <Flex
        borderTopColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderTopWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text>
          {store.accountOptions?.length || 0} accounts
        </Text>
      </Flex>
      <Flex
        borderTopColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderTopWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text>
          {store.payeeOptions?.length || 0} payees
        </Text>
      </Flex>
      <Flex
        borderTopColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderTopWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text>
          {store.categoryOptions?.length || 0} categories
        </Text>
      </Flex>
      <Flex
        borderTopColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderTopWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      />
      <Flex
        borderTopColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderTopWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text>{(paid / 100).toFixed(2)}</Text>
      </Flex>
      <Flex
        borderTopColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderTopWidth="1px"
        padding="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text>{(recieved / 100).toFixed(2)}</Text>
      </Flex>
    </>
  );
};

TableTotalRow.propTypes = {
  store: PropTypes.object.isRequired
};

export default observer(TableTotalRow);
