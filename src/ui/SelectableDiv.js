import React, { useState, useEffect, useRef } from 'react';
import Creatable from 'react-select/creatable';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';

const SelectableDiv = ({
  defaultValue,
  onChange,
  options,
  children,
  height,
  style
}) => {
  const resetStyles = {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    border: 'none',
    boxShadow: 'none',
    borderRadius: 0,
    background: 'none',
    backgroundColor: 'transparent',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    outline: 'none',
    width: '100%',
    height: '100%'
  };

  const customStyles = {
    container: originalStyles => ({
      ...originalStyles,
      ...resetStyles,
      zIndex: '5',
      margin: '0',
      height,
      width: '100%',
      border: 'dashed 2px white',
      backgroundColor: '#2D3748',
      borderRadius: '5px',
      ':hover': {
        outline: 'none'
      }
    }),
    control: originalStyles => ({
      ...originalStyles,
      ...resetStyles,
      color: 'white',
      minHeight: '20px'
    }),
    input: originalStyles => ({
      ...originalStyles,
      ...resetStyles,
      color: 'white',
      justifyConetn: 'flex-start'
    }),
    singleValue: originalStyles => ({
      ...originalStyles,
      ...resetStyles,
      justifyConetn: 'flex-start',
      color: 'white'
    }),
    placeholder: originalStyles => ({
      ...originalStyles,
      ...resetStyles,
      justifyConetn: 'flex-start'
    }),
    option: (originalStyles, { isSelected }) => ({
      ...originalStyles,
      ...resetStyles,
      padding: '2px',
      color: isSelected ? 'white' : 'white',
      background: '#1A202C',
      textAlign: 'right',
      cursor: 'pointer'
    }),
    menu: originalStyles => ({
      ...originalStyles,
      background: '#1A202C'
    }),
    dropdownIndicator: originalStyles => ({
      ...originalStyles,
      ...resetStyles,
      color: 'gray',
      cursor: 'pointer',
      ':hover': {
        color: 'white'
      }
    })
  };

  const inputRef = useRef();
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (editMode && inputRef?.current?.focus) {
      inputRef.current.focus();
    }
  }, [inputRef, editMode]);

  return editMode ? (
    <Creatable
      ref={inputRef}
      onBlur={() => setEditMode(false)}
      value={defaultValue}
      onChange={async opt => {
        try {
          await onChange(opt);
          setEditMode(false);
        } catch (ex) {
          // eslint-disable-next-line no-console
          console.log(ex);
        }
      }}
      options={options}
      styles={{ ...style, ...customStyles }}
    />
  ) : (
    <Flex
      onClick={() => setEditMode(true)}
      onFocus={() => setEditMode(true)}
      tabIndex={0}
      width="100%"
      padding="4px 8px"
      height={height}
      border="dashed 2px transparent"
      fontSize="13px"
      alignItems="center"
      borderRadius="5px"
      style={style}
      _hover={{ border: 'dashed 2px white' }}
    >
      {children}
    </Flex>
  );
};

SelectableDiv.propTypes = {
  defaultValue: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  height: PropTypes.string
};

SelectableDiv.defaultProps = {
  style: {},
  options: [],
  height: '40px'
};

export default SelectableDiv;
