import generate from '../stores/ListStore';
import AccountRelationStore from './AccountRelation.store';

const AccountListStore = generate(AccountRelationStore, {
  selectFilters: [
    {
      name: 'id',
      getter: item => item.id,
      skip: true,
      isMulti: true
    }
  ]
});

export default AccountListStore;
