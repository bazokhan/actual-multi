/* eslint-disable no-param-reassign */
import { types } from 'mobx-state-tree';
import {
  OptionalEmptyString,
  OptionalString
} from '../types';

const ColumnStore = types
  .model('ColumnStore', {
    label: OptionalString,
    show: types.optional(types.boolean, true),
    index: types.maybeNull(types.number)
  })
  .actions(self => ({
    changeShow: bool => {
      self.show = bool;
    },
    toggleShow: () => {
      self.show = !self.show;
    }
  }));

export default ({ sortFilters, extendedModel }) => ({
  databaseID: OptionalString,
  databaseColumnsID: OptionalString,
  databaseSortingID: OptionalString,
  itemsMap: types.optional(types.map(extendedModel), {}),
  itemsOrder: types.maybeNull(
    types.array(
      types.model({
        id: types.identifier
      })
    )
  ),
  activeItemID: OptionalEmptyString,
  viewMode: types.optional(
    types.enumeration(['card', 'list']),
    'list'
  ),
  columnsArray: types.optional(
    types.array(ColumnStore),
    []
  ),
  sortFilterID: sortFilters?.length
    ? types.maybeNull(
        types.enumeration(sortFilters.map(f => f.name))
      )
    : OptionalString,
  sortMode: types.optional(
    types.enumeration(['asc', 'desc']),
    'desc'
  )
});
