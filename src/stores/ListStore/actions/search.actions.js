/* eslint-disable no-param-reassign */
export default searchFilters =>
  searchFilters?.length
    ? self =>
        searchFilters.reduce((prev, filter) => {
          const change = `change${filter.name[0].toUpperCase()}${filter.name.slice(
            1
          )}Filter`;
          const filterName = `${filter.name}Filter`;
          prev = {
            ...prev,
            [change]: str => {
              self[filterName] = str;
            }
          };
          return prev;
        }, {})
    : () => ({});
