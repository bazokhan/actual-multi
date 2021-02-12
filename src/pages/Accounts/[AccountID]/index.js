import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import $ from '../../../helpers/skipString';
import select from '../../../helpers/select';
import TransactionsTableCell from '../../../components/TransactionsTableCell';
import TransactionRelationStore from '../../../models/TransactionRelation.store';
import TransactionListStore from '../../../models/TransactionList.store';

const store = TransactionListStore.create({});

const Account = () => {
  const { accountid } = useParams();

  return accountid ? (
    <TransactionsTableCell
      gql={select(
        'transactions',
        TransactionRelationStore,
        {
          transactions: {
            account: {
              id: {
                _eq: $(accountid)
              },
              tombstone: { _eq: 0 }
            },
            tombstone: { _eq: 0 }
          }
        }
      )}
      store={store}
      tableSize={100}
    />
  ) : null;
};

export default observer(Account);
