/* eslint-disable no-param-reassign */
import { values } from 'mobx';

/**
 * This function returs a views function that exposes the following props in the store:
 * (1) items: return array of all store items
 * (2) activeItem: return a single selected item by (self.selectItem) action
 * (3) sortFilter: return the active (currently applied) sort filter (sortFilters option must be supplied)
 */

export default sortFilters => self => ({
  get items() {
    return values(self.itemsMap);
  },
  get activeItem() {
    return self.itemsMap.get(self.activeItemID);
  },
  get sortFilter() {
    return sortFilters?.find(
      f => f.name === self.sortFilterID
    );
  }
});
