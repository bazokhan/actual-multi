/* eslint-disable no-param-reassign */
export default selectFilters =>
  selectFilters?.length
    ? self =>
        selectFilters.reduce((prev, filter) => {
          const add = `add${filter.name[0].toUpperCase()}${filter.name.slice(
            1
          )}Filter`;
          const remove = `remove${filter.name[0].toUpperCase()}${filter.name.slice(
            1
          )}Filter`;
          const toggle = `toggle${filter.name[0].toUpperCase()}${filter.name.slice(
            1
          )}Filter`;
          const filterName = `${filter.name}Filter`;
          prev = {
            ...prev,
            [add]: item => {
              if (filter.isMulti) {
                self[filterName].push(item);
              } else {
                self[filterName] = item;
              }
            },
            [remove]: item => {
              if (filter.isMulti) {
                self[filterName] = self[filterName].filter(
                  f => f !== item
                );
              } else {
                self[filterName] = '';
              }
            },
            [toggle]: item => {
              if (self[filterName].includes(item)) {
                self[remove](item);
              } else {
                self[add](item);
              }
            }
          };
          return prev;
        }, {})
    : () => ({});
