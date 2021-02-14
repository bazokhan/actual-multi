/* eslint-disable no-param-reassign */
import { getSnapshot, types } from 'mobx-state-tree';
import AccountListStore from '../../models/AccountList.store';
import TransactionListStore from '../../models/TransactionList.store';
import CalendarStore from '../CalendarStore';
import sum from '../../helpers/sum';
import REPORT_PROPS from '../../constants/ReportProps';

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
    selectedProps: types.optional(
      types.array(types.string),
      []
    ),
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
    activeTransactions: types.optional(
      TransactionListStore,
      getSnapshot(TransactionListStore.create({}))
    ),
    crated_at: types.maybeNull(types.Date)
  })
  .views(self => ({
    get props() {
      return self.selectedProps
        .map(p => REPORT_PROPS.find(P => P.name === p))
        .filter(p => p);
    },
    get chunked() {
      return multiChunk(
        self.transactions.sortedItems.map(t => ({
          ...t,
          category: t.category || { id: 'transfer' },
          payee: t.payee?.name
            ? t.payee
            : { ...t.payee, name: t.payee?.account?.name }
        })),
        self.props
      );
    }
  }))
  .actions(self => ({
    addProp: newProp => {
      if (!self.selectedProps.includes(newProp)) {
        self.selectedProps.push(newProp);
      }
    },
    removeProp: newProp => {
      self.selectedProps = self.selectedProps.filter(
        p => p !== newProp
      );
    },
    clearProps: () => {
      self.selectedProps = [];
    },
    toggleProp: newProp => {
      if (self.selectedProps.includes(newProp)) {
        self.removeProp(newProp);
      } else {
        self.addProp(newProp);
      }
    }
  }));

export default ReportStore;
