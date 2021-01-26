/* eslint-disable no-param-reassign */
export default self => ({
  updateItems: items => {
    self.itemsMap =
      items?.reduce((prev, item) => {
        prev[item.id] = item;
        return prev;
      }, {}) || {};
  },
  updateItemsOrder: items => {
    if (!items?.length) return;
    self.itemsOrder = items.map(item => ({
      id: item.id
    }));
  },
  upsertItem: item => {
    self.itemsMap.set(item.id, item);
  },
  deleteItem: item => {
    self.itemsMap.delete(item.id);
  },
  moveItem: (item, newIndex) => {
    const [startIndex, endIndex] = [
      self.sortedItems.map(i => i.id).indexOf(item.id),
      newIndex
    ];
    if (startIndex === endIndex) return;
    const newItemsOrder = [...self.sortedItems];
    newItemsOrder.splice(startIndex, 1);
    newItemsOrder.splice(endIndex, 0, item);
    self.updateItemsOrder(newItemsOrder);
    if (self.items.every(i => i.index !== undefined)) {
      newItemsOrder.map((orderItem, newI) => {
        const originalItem = self.items.find(
          i => i.id === orderItem.id
        );
        originalItem.updateIndex(newI);
        return originalItem;
      });
    }
  },
  selectItem: item => {
    self.activeItemID = item?.id;
  },
  deselectAllItems: () => {
    self.activeItemID = '';
  }
});
