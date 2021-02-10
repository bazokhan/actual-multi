/* eslint-disable no-param-reassign */
export default switchFilters =>
  switchFilters?.length
    ? self =>
        switchFilters.reduce((prev, filter) => {
          const toggle = `toggle${filter.name[0].toUpperCase()}${filter.name.slice(
            1
          )}Filter`;
          const filterName = `${filter.name}Filter`;
          prev = {
            ...prev,
            [toggle]: () => {
              self[filterName] = !self[filterName];
            }
          };
          return prev;
        }, {})
    : () => ({});
