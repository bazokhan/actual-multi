import { types } from 'mobx-state-tree';
import extend from '../../../helpers/extend';
import generate from '../../../store';
import TransactionModel from './TransactionModel';

const TransactionsList = generate(
  extend(TransactionModel, {
    index: types.maybeNull(types.number)
  }),
  {
    sortFilters: [
      {
        name: 'index',
        type: 'number',
        getter: item => item.index
      },
      {
        name: 'date',
        type: 'date',
        getter: item => item.date
      },
      {
        name: 'account',
        type: 'string',
        getter: item => item.account?.name
      },
      {
        name: 'payee',
        type: 'string',
        getter: item =>
          item.payee?.name || item.payee?.account?.name
      },
      {
        name: 'category',
        type: 'string',
        getter: item => item.category?.name
      },
      {
        name: 'notes',
        type: 'string',
        getter: item => item.notes
      },
      {
        name: 'paid',
        type: 'number',
        getter: item =>
          item.amount < 0 ? item.amount : null
      },
      {
        name: 'recieved',
        type: 'number',
        getter: item =>
          item.amount >= 0 ? item.amount : null
      }
    ]
  }
);

const store = TransactionsList.create({});

export default store;
