import { types } from 'mobx-state-tree';
import extend from '../../../helpers/extend';
import generate from '../../../stores/ListStore';
import TransactionModel from './TransactionModel';

const TransactionsList = generate(
  extend(TransactionModel, {
    index: types.maybeNull(types.number)
  }),
  {
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
          item.payee?.name
            ? item.payee
            : item.payee?.account
      }
    ],
    switchFilters: [
      {
        name: 'paid',
        getter: item => item.amount < 0,
        skip: true
      },
      {
        name: 'recieved',
        getter: item => item.amount > 0,
        skip: true
      }
    ],
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

export default TransactionsList;
