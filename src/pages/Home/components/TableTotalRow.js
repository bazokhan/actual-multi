import { Flex, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import sum from '../../../helpers/sum';

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

  return (
    <>
      <Flex>
        <Text>Total</Text>
      </Flex>
      <Flex />
      <Flex>
        <Text>
          {store.accountOptions?.length || 0} accounts
        </Text>
      </Flex>
      <Flex>
        <Text>
          {store.payeeOptions?.length || 0} payees
        </Text>
      </Flex>
      <Flex>
        <Text>
          {store.categoryOptions?.length || 0} categories
        </Text>
      </Flex>
      <Flex />
      <Flex>
        <Text>{(paid / 100).toFixed(2)}</Text>
      </Flex>
      <Flex>
        <Text>{(recieved / 100).toFixed(2)}</Text>
      </Flex>
    </>
  );
};

TableTotalRow.propTypes = {
  store: PropTypes.object.isRequired
};

export default observer(TableTotalRow);
