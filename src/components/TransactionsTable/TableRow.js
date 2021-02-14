/* eslint-disable no-console */
import PropTypes from 'prop-types';
import { IconButton, Text } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { CopyIcon } from '@chakra-ui/icons';
import EditableDiv from '../../ui/EditableDiv';
import SelectableDiv from '../../ui/SelectableDiv';
import formatDate from '../../helpers/formatDate';
import TransactionRelationStore from '../../models/TransactionRelation.store';
import updateByPK from '../../helpers/updateByPK';

const TableRow = ({ item }) => {
  const [updateTransactionMutation] = useMutation(
    updateByPK('transactions', TransactionRelationStore),
    {
      onCompleted: data => console.log(data),
      onError: error => console.log(error)
    }
  );

  const updateTransaction = async () => {
    updateTransactionMutation({
      variables: {
        id: item.id,
        set: { notes: 'This is updated via the table' }
      }
    });
  };

  return (
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
      <IconButton
        size="sm"
        icon={<CopyIcon />}
        onClick={updateTransaction}
      />
    </>
  );
};

TableRow.propTypes = {
  item: PropTypes.object.isRequired
};

export default TableRow;
