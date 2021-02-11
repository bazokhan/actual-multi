import PropTypes from 'prop-types';
import {
  Editable,
  EditableInput,
  EditablePreview,
  useColorMode
} from '@chakra-ui/react';

const EditableDiv = ({
  defaultValue,
  onSubmit,
  isDisabled,
  color,
  rtl
}) => {
  const { colorMode } = useColorMode();
  const styles = {
    padding: '4px 8px',
    border: 'solid 2px transparent',
    display: 'flex',
    justifyContent: rtl ? 'flex-end' : 'flex-start',
    alignItems: 'center',
    width: '100%',
    minHeight: '40px',
    borderRadius: '5px',
    fontSize: '13px',
    textAlign: rtl ? 'right' : 'left',
    color: color || 'inherit',
    outline: 'none',
    _hover: {
      border: 'dashed 2px #ddd',
      outline: 'none'
    },
    _focus: {
      border: 'dashed 2px #ddd',
      color: 'blue.100',
      outline: 'none'
    }
  };

  return (
    <Editable
      onSubmit={onSubmit}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
    >
      <EditablePreview {...styles} />
      <EditableInput
        {...styles}
        bg={colorMode === 'light' ? 'bg.300' : 'bg.700'}
      />
    </Editable>
  );
};

EditableDiv.propTypes = {
  defaultValue: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  color: PropTypes.string,
  rtl: PropTypes.bool,
  isDisabled: PropTypes.bool
};

EditableDiv.defaultProps = {
  defaultValue: '',
  color: null,
  rtl: false,
  isDisabled: false
};

export default EditableDiv;
