import PropTypes from 'prop-types';
import { Checkbox, Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react';

const TStoreSelectPayeeStep = ({ store }) => {
  const isAllChecked = store.payeeOptions.every(payee =>
    store.payeeFilter.includes(payee.value.id)
  );
  const isSomeChecked = store.payeeOptions.some(payee =>
    store.payeeFilter.includes(payee.value.id)
  );
  const checkAll = () =>
    store.payeeOptions.map(payee =>
      store.addPayeeFilter(payee)
    );
  const uncheckAll = () =>
    store.payeeOptions.map(payee =>
      store.removePayeeFilter(payee)
    );
  return (
    <Flex direction="column">
      <Checkbox
        isChecked={isAllChecked}
        isIndeterminate={isSomeChecked && !isAllChecked}
        onChange={() => {
          if (isAllChecked) {
            uncheckAll();
          } else {
            checkAll();
          }
        }}
      >
        Check/Uncheck All
      </Checkbox>
      {store.payeeOptions.map(payee => {
        const isChecked = store.payeeFilter.includes(
          payee.value.id
        );
        return (
          <Checkbox
            key={payee.value.id}
            marginLeft="10px"
            isChecked={isChecked}
            onChange={() => {
              store.togglePayeeFilter(payee);
            }}
          >
            {payee.value?.name ||
              payee.value?.account?.name}
          </Checkbox>
        );
      })}
    </Flex>
  );
};

TStoreSelectPayeeStep.propTypes = {
  store: PropTypes.object.isRequired
};

export default observer(TStoreSelectPayeeStep);
