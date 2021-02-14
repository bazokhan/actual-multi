import PropTypes from 'prop-types';
import { Checkbox, Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react';

const TStoreSelectCategoryStep = ({ store }) => {
  const isAllChecked = store.categoryOptions.every(
    category =>
      store.categoryFilter.includes(category.value.id)
  );
  const isSomeChecked = store.categoryOptions.some(
    category =>
      store.categoryFilter.includes(category.value.id)
  );
  const checkAll = () =>
    store.categoryOptions.map(category =>
      store.addCategoryFilter(category)
    );
  const uncheckAll = () =>
    store.categoryOptions.map(category =>
      store.removeCategoryFilter(category)
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
      {store.categoryOptions.map(category => {
        const isChecked = store.categoryFilter.includes(
          category.value.id
        );
        return (
          <Checkbox
            key={category.value.id}
            marginLeft="10px"
            isChecked={isChecked}
            onChange={() => {
              store.toggleCategoryFilter(category);
            }}
          >
            {category.label}
          </Checkbox>
        );
      })}
    </Flex>
  );
};

TStoreSelectCategoryStep.propTypes = {
  store: PropTypes.object.isRequired
};

export default observer(TStoreSelectCategoryStep);
