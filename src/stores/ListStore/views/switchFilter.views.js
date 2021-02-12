/* eslint-disable no-param-reassign */
import { assign } from '../helpers';

/**
 * This function returs a views function that exposes props to get items filtered by each select filter.
 * So, if you supply a (sortFilters) option with a filter that has name: "categories",
 * you will be able to access items filtered by a certain category using (self.filteredByCategoriesFilter)
 */
export default switchFilters => self =>
  switchFilters?.reduce((prev, filter) => {
    const filterName = `${filter.name}Filter`;
    const getValue = filter.getter;
    const filterByName = `filteredBy${filter.name[0].toUpperCase()}${filter.name.slice(
      1
    )}Filter`;
    prev = assign(prev, {
      get [filterByName]() {
        return self[filterName]
          ? self.sortedItems.filter(item => getValue(item))
          : [];
      }
    });
    return prev;
  }, {}) || {};
