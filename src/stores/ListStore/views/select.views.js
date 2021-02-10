/* eslint-disable no-param-reassign */
import { assign } from '../helpers';

/**
 * This function returs a views function that exposes all select filters as props using getters.
 * So, if you supply a (selectFilters) option with a filter that has name: "categories",
 * you will be able to access all categories of all items using (self.categories)
 */
export default selectFilters => self =>
  selectFilters?.reduce((prev, filter) => {
    prev = assign(prev, {
      get [filter.name]() {
        return self.items.reduce((p, item) => {
          const getValue = filter.getter;
          const value = getValue(item);
          if (value && p.indexOf(value) === -1) {
            p.push(value);
          }
          return Array.isArray(value)
            ? p
                .flat()
                .filter(
                  (platform, i, arr) =>
                    arr.indexOf(platform) === i
                )
            : p.filter(
                (platform, i, arr) =>
                  arr.indexOf(platform) === i
              );
        }, []);
      }
    });
    return prev;
  }, {}) || {};
