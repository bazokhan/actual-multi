import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/react';
import EditableDiv from '../../../ui/EditableDiv';
import SelectableDiv from '../../../ui/SelectableDiv';
import formatDate from '../../../helpers/formatDate';

const TableRow = ({ item }) => (
  <>
    <Text>{item.index}</Text>
    <Text>{formatDate(item.date)}</Text>
    <SelectableDiv
      defaultValue={item.account?.name}
      onChange={() => {}}
      options={[{ label: 'Hi', value: 'hello' }]}
    >
      <Text>{item.account?.name}</Text>
    </SelectableDiv>
    <SelectableDiv
      defaultValue={
        item.payee?.name || item.payee?.account?.name
      }
      onChange={() => {}}
      options={[{ label: 'Hi', value: 'hello' }]}
    >
      <Text>
        {item.payee?.name || item.payee?.account?.name}
      </Text>
    </SelectableDiv>
    <SelectableDiv
      defaultValue={item.category?.name}
      onChange={() => {}}
      options={[{ label: 'Hi', value: 'hello' }]}
    >
      <Text>{item.category?.name}</Text>
    </SelectableDiv>
    <EditableDiv
      onSubmit={() => {}}
      defaultValue={item.notes}
    />
    <EditableDiv
      onSubmit={() => {}}
      defaultValue={
        item.amount < 0
          ? `${(item.amount / 100).toFixed(2)}`
          : ''
      }
    />
    <EditableDiv
      onSubmit={() => {}}
      defaultValue={
        item.amount >= 0
          ? `${(item.amount / 100).toFixed(2)}`
          : ''
      }
    />
  </>
);

TableRow.propTypes = {
  item: PropTypes.object.isRequired
};

export default TableRow;
