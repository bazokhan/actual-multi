import { types } from 'mobx-state-tree';
import extend from '../../../helpers/extend';
import AccountStore from '../../../models/Account.store';
import PayeeStore from '../../../models/Payee.store';

const AccountModel = extend(AccountStore, {
  payee: types.maybeNull(PayeeStore)
});

export default AccountModel;
