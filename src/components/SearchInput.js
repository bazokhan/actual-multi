import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { observer } from 'mobx-react';

const SearchInput = ({ name, store, placeholder }) => {
  const filterName = `${name}Filter`;
  const filterActionName = `change${name[0].toUpperCase()}${name.slice(
    1
  )}Filter`;

  return (
    <InputGroup flex="1" mx="20px" maxW="350px">
      <InputLeftElement>
        <Icon name="search" color="text.800" />
      </InputLeftElement>
      <Input
        placeholder={placeholder || 'Search'}
        type="text"
        flex="1"
        py={2}
        px={4}
        rounded="10px"
        borderColor="#efefef"
        borderWidth="1px"
        bg="bg.900"
        color="headline.900"
        fontSize="14px"
        _hover={{ borderColor: 'headline.900' }}
        _focus={{
          outline: 'none',
          color: 'inherit',
          bg: 'bg.900',
          borderColor: 'main.900',
          borderWidth: '2px'
        }}
        onChange={e => {
          store[filterActionName](e.target.value);
        }}
        value={store[filterName]}
        _placeholder={{
          color: '#d1d1d1',
          fontWeight: 'bold'
        }}
      />
    </InputGroup>
  );
};

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
  placeholder: PropTypes.string
};

SearchInput.defaultProps = {
  placeholder: null
};

export default observer(SearchInput);
