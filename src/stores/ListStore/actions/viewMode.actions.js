/* eslint-disable no-param-reassign */
export default self => ({
  changeViewMode: viewMode => {
    self.viewMode = viewMode;
  },
  toggleViewMode: () => {
    self.viewMode =
      self.viewMode === 'card' ? 'list' : 'card';
  }
});
