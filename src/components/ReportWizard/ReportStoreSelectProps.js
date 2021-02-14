import PropTypes from 'prop-types';
import { Checkbox, Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import REPORT_PROPS from '../../constants/ReportProps';

const ReportStoreSelectPropsStep = ({ store }) => {
  const isAllChecked = REPORT_PROPS.every(prop =>
    store.selectedProps.includes(prop.name)
  );
  const isSomeChecked = REPORT_PROPS.some(prop =>
    store.selectedProps.includes(prop.name)
  );
  const checkAll = () =>
    REPORT_PROPS.map(prop => store.addProp(prop.name));
  const uncheckAll = () =>
    REPORT_PROPS.map(prop => store.removeProp(prop.name));
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
      {REPORT_PROPS.map(prop => {
        const isChecked = store.selectedProps.includes(
          prop.name
        );
        return (
          <Checkbox
            key={prop.name}
            marginLeft="10px"
            isChecked={isChecked}
            onChange={() => {
              store.toggleProp(prop.name);
            }}
          >
            {prop.name}
          </Checkbox>
        );
      })}
    </Flex>
  );
};

ReportStoreSelectPropsStep.propTypes = {
  store: PropTypes.object.isRequired
};

export default observer(ReportStoreSelectPropsStep);
