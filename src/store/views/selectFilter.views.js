/* eslint-disable no-param-reassign */
import { assign } from '../helpers';

/**
 * This function returs a views function that exposes props to get items filtered by each select filter.
 * So, if you supply a (sortFilters) option with a filter that has name: "categories",
 * you will be able to access items filtered by a certain category using (self.filteredByCategoriesFilter)
 */
export default selectFilters => self =>
  selectFilters?.reduce((prev, filter) => {
    const filterName = `${filter.name}Filter`;
    const getValue = filter.getter;
    const filterByName = `filteredBy${filter.name[0].toUpperCase()}${filter.name.slice(
      1
    )}Filter`;
    prev = assign(prev, {
      get [filterByName]() {
        return self.items.filter(item => {
          const value = getValue(item);
          return self[filterName]?.length
            ? filter.isMulti
              ? Array.isArray(value)
                ? self[filterName].some(f =>
                    value.includes(f)
                  )
                : self[filterName].includes(value)
              : Array.isArray(value)
              ? value.includes(self[filterName])
              : self[filterName] === value
            : false;
        });
      }
    });
    return prev;
  }, {}) || {};
