import PropTypes from 'prop-types';
import {
  Grid,
  Text,
  Flex,
  useColorMode
} from '@chakra-ui/react';
import DatePicker from '../DatePicker';

const DateStoreStep = ({ store }) => {
  const { colorMode } = useColorMode();
  return (
    <Grid
      gridTemplateRows="auto auto"
      rowGap="20px"
      padding="20px"
    >
      <Flex direction="column">
        <Text>Start Date: </Text>
        <Text
          margin="0 0 10px"
          fontWeight="bold"
          color={
            colorMode === 'light'
              ? 'main1.800'
              : 'main1.200'
          }
        >
          {store.calendarStartDate.string}
        </Text>
        <DatePicker store={store.calendarStartDate} />
      </Flex>
      <Flex direction="column">
        <Text>End Date: </Text>
        <Text
          margin="0 0 10px"
          fontWeight="bold"
          color={
            colorMode === 'light'
              ? 'main1.800'
              : 'main1.200'
          }
        >
          {store.calendarEndDate.string}
        </Text>
        <DatePicker store={store.calendarEndDate} />
      </Flex>
    </Grid>
  );
};

DateStoreStep.propTypes = {
  store: PropTypes.object.isRequired
};

export default DateStoreStep;
