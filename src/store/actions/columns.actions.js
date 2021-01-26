/* eslint-disable no-param-reassign */
export default self => ({
  updateActiveColumns: columnsObject => {
    Object.entries(columnsObject).map(([key, value]) => {
      const column = self.columnsArray.find(col => {
        const columnID = `${col.label[0].toLowerCase()}${col.label
          .slice(1)
          .replace(' ', '')}`;
        return key === columnID;
      });
      if (!column) return null;
      column.changeShow(value?.show);
      return column;
    });
    self.saveColumnsInDB();
  },
  updateColumns: columnsArray => {
    self.columnsArray = columnsArray;
  }
});
