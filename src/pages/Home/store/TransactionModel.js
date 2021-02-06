import { types } from 'mobx-state-tree';
import AccountStore from '../../../models/Account.store';
import TransactionStore from '../../../models/Transaction.store';
import extend from '../../../helpers/extend';
import CategoryStore from '../../../models/Category.store';
import PayeeStore from '../../../models/Payee.store';

const TransactionModel = extend(TransactionStore, {
  account: types.maybeNull(AccountStore),
  category: types.maybeNull(CategoryStore),
  payee: types.maybeNull(
    extend(PayeeStore, {
      account: types.maybeNull(AccountStore)
    })
  )
});

export default TransactionModel;
