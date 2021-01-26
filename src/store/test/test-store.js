import { types } from 'mobx-state-tree';
import ADDONS from '../addons';
import generateListModel from '../initializers/generateListModel';

export const items = [
  {
    id: '1',
    name: 'MineCraft',
    moreDetails: { category: 'Games' },
    status: 'Active'
  },
  {
    id: '2',
    name: 'HipHop',
    moreDetails: { category: 'Music' },
    status: 'Pending'
  }
];

export const unsortedColumns = [
  { label: 'status', show: false },
  { label: 'category', show: true }
];

export const sortColumns = [
  { label: 'status', show: false, index: 1 },
  { label: 'category', show: true, index: 0 }
];

export const itemModel = {
  id: types.identifier,
  name: types.string,
  moreDetails: types.model({
    category: types.string
  }),
  status: types.string,
  price: types.maybeNull(types.string)
};

export const tableModelOptions = {
  searchFilters: [
    { name: 'name', getter: item => item.name }
  ],
  selectFilters: [
    {
      name: 'categories',
      isMulti: true,
      getter: item => item.moreDetails?.category
    },
    {
      name: 'status',
      getter: item => item.status
    }
  ],
  switchFilters: [
    {
      name: 'productOnly',
      getter: item => item.price === 'Product Only'
    }
  ]
};

const ItemModel = types.model('Item', itemModel);

const TableModel = generateListModel(
  ItemModel,
  ADDONS,
  tableModelOptions
);

const store = TableModel.create({});

export default store;
