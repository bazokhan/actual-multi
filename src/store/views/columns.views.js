/* eslint-disable no-param-reassign */

/**
 * This is a views function that exposes the following props in the store:
 * (1) columns: return array of columns of the table that will be displayed (columns option must be supplied)
 * (2) activeColumns: same as (3) but return as object with {[columnID]: true | false} structure
 */

export default self => ({
  get sortedColumns() {
    return [...self.columnsArray].sort(
      (a, b) => a.index - b.index
    );
  },
  get visibleColumns() {
    return self.sortedColumns.filter(col => col.show);
  },
  get activeColumns() {
    return self.sortedColumns.reduce((prev, col) => {
      const columnID = `${col.label[0].toLowerCase()}${col.label
        .slice(1)
        .replace(' ', '')}`;

      prev[columnID] = {
        key: col.label,
        index: col.index,
        show: col.show || false
      };
      return prev;
    }, {});
  }
});
