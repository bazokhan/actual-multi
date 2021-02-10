/* eslint-disable no-param-reassign */

const sortArrayByArray = (
  sortee,
  sorter,
  link = { sortee: 'id', sorter: 'id' }
) => {
  if (!Array.isArray(sortee)) return sortee;
  // https://stackoverflow.com/questions/13304543/javascript-sort-array-based-on-another-array
  return [...sortee].sort((a, b) => {
    const index1 =
      sorter
        ?.map(record => record[link.sorter])
        .indexOf(a[link.sortee]) ?? -1;
    const index2 =
      sorter
        ?.map(record => record[link.sorter])
        .indexOf(b[link.sortee]) ?? -1;
    return (
      (index1 > -1 ? index1 : Infinity) -
      (index2 > -1 ? index2 : Infinity)
    );
  });
};

/**
 * This is the core ENGINE of filtering and sorting.
 * It chains all filters and sorters (except for select filters with a skip flag = true).
 * It finally exposes a prop called store.sortedItems that has the final items.
 */
export default ({
  searchFilters,
  selectFilters,
  switchFilters
}) => self => ({
  get hasFilters() {
    return [searchFilters, selectFilters, switchFilters]
      .filter(f => f?.length)
      .flat()
      .some(filter => {
        const filterName = `${filter.name}Filter`;
        return typeof self[filterName] === 'boolean'
          ? self[filterName]
          : self[filterName]?.length;
      });
  },
  get filteredItemsBySearch() {
    return searchFilters?.length
      ? searchFilters.reduce((prev, filter) => {
          if (!filter?.getter) return prev;
          const filterName = `${filter.name}Filter`;
          const getValue = filter.getter;
          return prev.filter(item => {
            const value = getValue(item);
            return self[filterName].length
              ? Array.isArray(value)
                ? value.some(target =>
                    target
                      ?.toLowerCase?.()
                      .includes(
                        self[filterName].toLowerCase()
                      )
                  )
                : value
                    ?.toLowerCase()
                    .includes(
                      self[filterName].toLowerCase()
                    )
              : item;
          });
        }, self.items)
      : self.items;
  },
  get filteredItemsBySelect() {
    return selectFilters?.length
      ? selectFilters.reduce((prev, filter) => {
          if (!filter?.getter) return prev;
          if (filter.skip) return prev;
          const filterName = `${filter.name}Filter`;
          const getValue = filter.getter;
          return prev.filter(item => {
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
              : item;
          });
        }, self.filteredItemsBySearch)
      : self.filteredItemsBySearch;
  },
  get filteredItemsBySwitch() {
    return switchFilters?.length
      ? switchFilters.reduce((prev, filter) => {
          if (!filter?.getter) return prev;
          const filterName = `${filter.name}Filter`;
          const getValue = filter.getter;
          return prev.filter(item =>
            self[filterName] ? getValue(item) : item
          );
        }, self.filteredItemsBySelect)
      : self.filteredItemsBySelect;
  },
  get filteredItems() {
    return self.filteredItemsBySwitch;
  },
  get filteredItemsBySort() {
    if (!self.sortFilter?.getter) {
      return self.filteredItems;
    }
    const getValue = self.sortFilter.getter;
    if (self.sortFilter.type === 'string') {
      // https://stackoverflow.com/questions/51165/how-to-sort-strings-in-javascript
      return [...self.filteredItems].sort((a, b) => {
        if (!getValue(a)) return 1; // Always make undefined appear last
        if (!getValue(b)) return -1;
        return self.sortMode === 'asc'
          ? getValue(a)?.localeCompare?.(getValue(b))
          : getValue(b)?.localeCompare?.(getValue(a));
      });
    }
    if (self.sortFilter.type === 'number') {
      return [...self.filteredItems].sort((a, b) => {
        if (!getValue(a)) return 1; // Always make undefined appear last
        if (!getValue(b)) return -1;
        return self.sortMode === 'asc'
          ? getValue(a) - getValue(b)
          : getValue(b) - getValue(a);
      });
    }
    if (self.sortFilter.type === 'date') {
      return [...self.filteredItems].sort((a, b) => {
        const valueA = new Date(getValue(a));
        const valueB = new Date(getValue(b));
        if (!valueA || valueA === 'Invalid Date') return 1; // Always make undefined appear last
        if (!valueB || valueB === 'Invalid Date') return -1;
        return self.sortMode === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      });
    }
    return self.filteredItems;
  },
  get sortedItems() {
    if (self.itemsOrder) {
      const ordered = sortArrayByArray(
        self.filteredItemsBySort,
        self.itemsOrder
      );
      return ordered;
    }
    return self.filteredItemsBySort;
  }
});
