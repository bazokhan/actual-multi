/* eslint-disable no-param-reassign */
export default ({
  searchFilters,
  selectFilters,
  switchFilters
}) => self => ({
  resetFilters: () => {
    [searchFilters, selectFilters, switchFilters]
      .filter(f => f?.length)
      .flat()
      .forEach(filter => {
        const filterName = `${filter.name}Filter`;
        if (!self[filterName]) return;
        if (typeof self[filterName] === 'boolean') {
          self[filterName] = false;
        } else if (typeof self[filterName] === 'string') {
          self[filterName] = '';
        } else if (Array.isArray(self[filterName])) {
          self[filterName] = [];
        }
      });
  }
});
