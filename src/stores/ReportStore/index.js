import { getSnapshot, types } from 'mobx-state-tree';
import AccountStore from '../../models/Account.store';
import CategoryStore from '../../models/Category.store';
import PayeeStore from '../../models/Payee.store';
import TransactionStore from '../../models/Transaction.store';
import generate from '../ListStore';

const AccountsListStore = generate(AccountStore, {
  selectFilters: [
    {
      name: 'id',
      getter: item => item.id,
      skip: true,
      isMulti: true
    }
  ]
});
const CategoriesListStore = generate(CategoryStore);
const PayeesListStore = generate(PayeeStore);
const TransactionsListStore = generate(TransactionStore);

const ReportStore = types.model('Report', {
  id: types.identifier,
  startDate: types.maybeNull(types.Date),
  endDate: types.maybeNull(types.Date),
  accounts: types.optional(
    AccountsListStore,
    getSnapshot(AccountsListStore.create({}))
  ),
  categories: types.optional(
    CategoriesListStore,
    getSnapshot(CategoriesListStore.create({}))
  ),
  payees: types.optional(
    PayeesListStore,
    getSnapshot(PayeesListStore.create({}))
  ),
  transactions: types.optional(
    TransactionsListStore,
    getSnapshot(TransactionsListStore.create({}))
  ),
  crated_at: types.maybeNull(types.Date)
});

export default ReportStore;
