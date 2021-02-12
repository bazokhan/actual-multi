import { types } from 'mobx-state-tree';
import AccountStore from './Account.store';
import PayeeStore from './Payee.store';
import extend from '../helpers/extend';

const AccountRelationStore = extend(AccountStore, {
  payee: types.maybeNull(PayeeStore)
});

export default AccountRelationStore;
