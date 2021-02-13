/* eslint-disable no-param-reassign */
import { getSnapshot, types } from 'mobx-state-tree';
import AccountListStore from '../../models/AccountList.store';
import TransactionListStore from '../../models/TransactionList.store';
import CalendarStore from '../CalendarStore';
import sum from '../../helpers/sum';

const chunk = (transactions, prop) => {
  if (!transactions?.length || !prop) {
    // eslint-disable-next-line no-console
    console.log('Error');
    return [];
  }
  return transactions.reduce((prev, t) => {
    const targetProp = prop.itemIdentifier(t);
    if (targetProp === undefined || targetProp === null)
      return prev;
    const targetChunk = prev.find(c =>
      prop.validator(c, t)
    );
    if (!targetChunk?.transactions?.length) {
      prev.push({
        identifier: prop.chunkIdentifier(t),
        prop,
        transactions: [t]
      });
      return prev;
    }
    targetChunk.transactions.push(t);
    return prev;
  }, []);
};

const multiChunk = (transactions, props) => {
  if (!props.length || !transactions?.length) {
    return 'Complete';
  }
  return chunk(transactions, props[0]).map(c => {
    const chunked = multiChunk(
      c.transactions,
      props.slice(1)
    );
    return {
      ...c,
      chunked,
      paid: sum(c.transactions.filter(t => t.amount < 0)),
      recieved: sum(
        c.transactions.filter(t => t.amount > 0)
      ),
      sum: sum(c.transactions)
    };
  });
};

const ReportStore = types
  .model('Report', {
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
  })
  .views(self => ({
    get chunked() {
      const props = [
        {
          name: 'account',
          itemIdentifier: item => item.account?.id,
          chunkIdentifier: item => item.account,
          validator: (c, item) =>
            c.identifier.id === item.account?.id
        },
        {
          name: 'date',
          itemIdentifier: item => item.date,
          chunkIdentifier: item => ({
            name: `${item.date?.getFullYear()} / ${
              item.date?.getMonth() + 1
            }`,
            value: item.date
          }),
          validator: (c, item) =>
            c.identifier.value?.getMonth() ===
              item.date?.getMonth() &&
            c.identifier.value?.getFullYear() ===
              item.date?.getFullYear()
        },
        {
          name: 'type',
          itemIdentifier: item => item.amount < 0,
          chunkIdentifier: item =>
            item.amount > 0
              ? {
                  name: 'recieved',
                  value: false
                }
              : { name: 'paid', value: true },
          validator: (c, item) =>
            c.identifier.value === item.amount < 0
        },
        {
          name: 'category',
          itemIdentifier: item => item.category?.id,
          chunkIdentifier: item => item.category,
          validator: (c, item) =>
            c.identifier.id === item.category?.id
        },
        {
          name: 'payee',
          itemIdentifier: item => item.payee?.id,
          chunkIdentifier: item => item.payee,
          validator: (c, item) =>
            c.identifier.id === item.payee?.id
        }
      ];
      return multiChunk(
        self.transactions.sortedItems.map(t => ({
          ...t,
          category: t.category || { id: 'transfer' },
          payee: t.payee?.name
            ? t.payee
            : { ...t.payee, name: t.payee?.account?.name }
        })),
        props
      );
    }
  }));

export default ReportStore;
