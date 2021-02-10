/* eslint-disable no-param-reassign */
import { types } from 'mobx-state-tree';
import generateListModel from '../../initializers/generateListModel';

const addSubListAddon = (options = {}) => {
  const { lists } = options;
  if (
    !lists.every(l => l.listName) ||
    !lists.every(l => l.listItemModel)
  )
    throw new Error(
      'SubList Addon has two required options: "listName" and "listItemModel"'
    );
  return {
    model:
      lists.reduce((prev, list) => {
        prev[`${list.listName}List`] = types.optional(
          generateListModel(
            list.listItemModel,
            list.listOptions
          ),
          {}
        );
        return prev;
      }, {}) || {},
    views: () => ({}),
    actions: () => ({}),
    itemModel: {},
    itemViews: () => ({}),
    itemActions: () => ({})
  };
};

export default addSubListAddon;
