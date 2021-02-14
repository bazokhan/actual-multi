import {
  Flex,
  IconButton,
  useColorMode
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import {
  ChevronUpIcon,
  ChevronDownIcon
} from '@chakra-ui/icons';

const SortingButtons = ({ store, name }) => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      flexDirection="column"
      width="fit-content"
      alignItems="center"
      boxShadow="none"
      height="30px"
    >
      <IconButton
        icon={<ChevronUpIcon />}
        onClick={() => store.sort(name, 'desc')}
        size="sm"
        bg="transparent"
        color={colorMode === 'light' ? 'bg.700' : 'bg.300'}
        mb={1}
        _focus={{ borderWidth: 0 }}
        _hover={{ bg: 'blueHover' }}
        isActive={
          store.sortFilterID === name &&
          store.sortMode === 'desc'
        }
      />
      <IconButton
        icon={<ChevronDownIcon />}
        onClick={() => store.sort(name, 'asc')}
        size="sm"
        bg="transparent"
        color={colorMode === 'light' ? 'bg.700' : 'bg.300'}
        _focus={{ borderWidth: 0 }}
        _hover={{ bg: 'blueHover' }}
        isActive={
          store.sortFilterID === name &&
          store.sortMode === 'asc'
        }
      />
    </Flex>
  );
};

SortingButtons.propTypes = {
  name: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired
};

export default observer(SortingButtons);
