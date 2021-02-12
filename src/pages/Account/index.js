import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import $ from '../../helpers/skipString';
import TransactionsList from '../Home/store/TransactionsList';
import select from '../../helpers/select';
import TransactionsTableCell from '../Home/components/TransactionsTableCell';
import TransactionModel from '../Home/store/TransactionModel';

const store = TransactionsList.create({});

const Account = () => {
  const { accountid } = useParams();

  return accountid ? (
    <TransactionsTableCell
      gql={select('transactions', TransactionModel, {
        transactions: {
          account: {
            id: {
              _eq: $(accountid)
            },
            tombstone: { _eq: 0 }
          },
          tombstone: { _eq: 0 }
        }
      })}
      store={store}
      tableSize={100}
      height="100vh"
    />
  ) : null;
};

export default observer(Account);
