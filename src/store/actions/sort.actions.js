/* eslint-disable no-param-reassign */
export default self => ({
  sort: (sortFilterName, sortMode) => {
    if (
      sortFilterName === self.sortFilterID &&
      sortMode === self.sortMode
    )
      return;
    self.sortFilterID = sortFilterName;
    self.sortMode = sortMode;
    self.saveSortingInDB();
  }
});
