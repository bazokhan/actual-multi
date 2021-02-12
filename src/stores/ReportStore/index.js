import { getSnapshot, types } from 'mobx-state-tree';
import AccountStore from '../../models/Account.store';
// import CategoryStore from '../../models/Category.store';
// import PayeeStore from '../../models/Payee.store';
import TransactionModel from '../../pages/Home/store/TransactionModel';
import CalendarStore from '../CalendarStore';
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
// const CategoriesListStore = generate(CategoryStore);
// const PayeesListStore = generate(PayeeStore);
const TransactionsListStore = generate(TransactionModel, {
  selectFilters: [
    {
      name: 'account',
      isMulti: true,
      getter: item => item.account
    },
    {
      name: 'category',
      isMulti: true,
      getter: item => item.category
    },
    {
      name: 'payee',
      isMulti: true,
      getter: item =>
        item.payee?.name ? item.payee : item.payee?.account
    }
  ]
});

const ReportStore = types.model('Report', {
  id: types.identifier,
  date: types.optional(
    CalendarStore,
    getSnapshot(CalendarStore.create({}))
  ),
  accounts: types.optional(
    AccountsListStore,
    getSnapshot(AccountsListStore.create({}))
  ),
  // categories: types.optional(
  //   CategoriesListStore,
  //   getSnapshot(CategoriesListStore.create({}))
  // ),
  // payees: types.optional(
  //   PayeesListStore,
  //   getSnapshot(PayeesListStore.create({}))
  // ),
  transactions: types.optional(
    TransactionsListStore,
    getSnapshot(TransactionsListStore.create({}))
  ),
  crated_at: types.maybeNull(types.Date)
});

export default ReportStore;
