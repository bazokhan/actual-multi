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
          if (
            typeof value === 'object' &&
            value?.id &&
            value?.name
          ) {
            if (
              p.map(i => i?.id).indexOf(value?.id) === -1
            ) {
              p.push(value);
            }
            return Array.isArray(value)
              ? p
                  .flat()
                  .filter(v => v?.id)
                  .filter(
                    (v, i, arr) =>
                      arr
                        .map(it => it?.id)
                        .indexOf(v?.id) === i
                  )
              : p
                  .filter(v => v?.id)
                  .filter(
                    (v, i, arr) =>
                      arr
                        .map(it => it?.id)
                        .indexOf(v?.id) === i
                  );
          }
          if (value && p.indexOf(value) === -1) {
            p.push(value);
          }
          return Array.isArray(value)
            ? p
                .flat()
                .filter((v, i, arr) => arr.indexOf(v) === i)
            : p.filter((v, i, arr) => arr.indexOf(v) === i);
        }, []);
      },
      get [`current_${filter.name}`]() {
        return self.sortedItems.reduce((p, item) => {
          const getValue = filter.getter;
          const value = getValue(item);
          if (
            typeof value === 'object' &&
            value?.id &&
            value?.name
          ) {
            if (
              p.map(i => i?.id).indexOf(value?.id) === -1
            ) {
              p.push(value);
            }
            return Array.isArray(value)
              ? p
                  .flat()
                  .filter(v => v?.id)
                  .filter(
                    (v, i, arr) =>
                      arr
                        .map(it => it?.id)
                        .indexOf(v?.id) === i
                  )
              : p
                  .filter(v => v?.id)
                  .filter(
                    (v, i, arr) =>
                      arr
                        .map(it => it?.id)
                        .indexOf(v?.id) === i
                  );
          }
          if (value && p.indexOf(value) === -1) {
            p.push(value);
          }
          return Array.isArray(value)
            ? p
                .flat()
                .filter((v, i, arr) => arr.indexOf(v) === i)
            : p.filter((v, i, arr) => arr.indexOf(v) === i);
        }, []);
      }
    });
    return prev;
  }, {}) || {};
