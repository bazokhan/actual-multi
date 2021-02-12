import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';

const ReportStoreStep = ({ store }) => (
  <>
    <Text>Generating Report For:</Text>
    <Text>
      {store.accounts.filteredByIdFilter
        .map(a => a.name)
        .join(', ')}
    </Text>
    <Text>{store.date.calendarStartDate.string}</Text>
    <Text>{store.date.calendarEndDate.string}</Text>
  </>
);

ReportStoreStep.propTypes = {
  store: PropTypes.object.isRequired
};

export default observer(ReportStoreStep);
