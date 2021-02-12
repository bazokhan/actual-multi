import { getSnapshot, types } from 'mobx-state-tree';
import AccountListStore from '../../models/AccountList.store';
import TransactionListStore from '../../models/TransactionList.store';
import CalendarStore from '../CalendarStore';

const ReportStore = types.model('Report', {
  id: types.identifier,
  date: types.optional(
    CalendarStore,
    getSnapshot(CalendarStore.create({}))
  ),
  accounts: types.optional(
    AccountListStore,
    getSnapshot(AccountListStore.create({}))
  ),
  transactions: types.optional(
    TransactionListStore,
    getSnapshot(TransactionListStore.create({}))
  ),
  crated_at: types.maybeNull(types.Date)
});

export default ReportStore;
