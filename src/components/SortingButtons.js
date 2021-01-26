import { Flex, IconButton } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

const SortingButtons = ({ store, name }) => (
  <Flex
    flexDirection="column"
    width="fit-content"
    alignItems="center"
    boxShadow="none"
    height="30px"
  >
    <IconButton
      icon="angle-up"
      onClick={() => store.sort(name, 'desc')}
      size="sm"
      bg="bg.900"
      color="text.800"
      mb={1}
      _focus={{ borderWidth: 0 }}
      _hover={{ bg: 'blueHover' }}
      isActive={
        store.sortFilterID === name &&
        store.sortMode === 'desc'
      }
    />
    <IconButton
      icon="angle-down"
      onClick={() => store.sort(name, 'asc')}
      size="sm"
      bg="bg.900"
      color="text.800"
      _focus={{ borderWidth: 0 }}
      _hover={{ bg: 'blueHover' }}
      isActive={
        store.sortFilterID === name &&
        store.sortMode === 'asc'
      }
    />
  </Flex>
);

SortingButtons.propTypes = {
  name: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired
};

export default observer(SortingButtons);
