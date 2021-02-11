import PropTypes from 'prop-types';
import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';

const MultiSelect = ({ store, title, name }) => {
  const properName = name[0].toUpperCase() + name.slice(1);
  return (
    <Flex direction="column">
      <Text>
        Selected {title}:{' '}
        {store[`filteredBy${properName}Filter`]
          ?.map(item => item.name)
          ?.join(', ') || 'None'}
      </Text>
      <Flex direction="column">
        {store.sortedItems.map(item => (
          <Checkbox
            key={item.id}
            isChecked={store[`${name}Filter`].includes(
              item.id
            )}
            onChange={() => {
              if (
                store[`${name}Filter`].includes(item.id)
              ) {
                store[`remove${properName}Filter`](item.id);
              } else {
                store[`add${properName}Filter`](item.id);
              }
            }}
          >
            {item.name}
          </Checkbox>
        ))}
      </Flex>
    </Flex>
  );
};

MultiSelect.propTypes = {
  store: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default observer(MultiSelect);
