import { types } from 'mobx-state-tree';
import AccountStore from './Account.store';
import TransactionStore from './Transaction.store';
import CategoryStore from './Category.store';
import PayeeStore from './Payee.store';
import extend from '../helpers/extend';

const TransactionRelationStore = extend(TransactionStore, {
  account: types.maybeNull(AccountStore),
  category: types.maybeNull(CategoryStore),
  payee: types.maybeNull(
    extend(PayeeStore, {
      account: types.maybeNull(AccountStore)
    })
  )
});

export default TransactionRelationStore;
