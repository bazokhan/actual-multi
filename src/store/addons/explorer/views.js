/* eslint-disable no-param-reassign */
import {
  assign,
  nest,
  createBreadCrumbs
} from '../../helpers';

export default fileTypes => self =>
  fileTypes?.reduce(
    (prev, fileType) => {
      prev = assign(prev, {
        get [`${fileType}Items`]() {
          return self.sortedItems.filter(
            item => item.fileType === fileType
          );
        }
      });
      return prev;
    },
    {
      get nestedItems() {
        return nest(self.sortedItems) || [];
      },

      get unknown() {
        return self.sortedItems.filter(
          item => !fileTypes.includes(item.fileType)
        );
      },
      get renamedItem() {
        return self.itemsMap.get(self.renamedItemID);
      },
      get deletedItem() {
        return self.itemsMap.get(self.deletedItemID);
      },
      get contextMenuItem() {
        if (!self.contextMenuListName?.length) {
          return self.itemsMap.get(self.contextMenuItemID);
        }
        const accessors = self.contextMenuListName.split(
          '.'
        );
        return accessors.reduce((prev, prop, index) => {
          prev = prev?.[prop];
          if (index === accessors.length - 1) {
            return prev?.get(self.contextMenuItemID);
          }
          return prev;
        }, self);
      },
      get breadcrumbs() {
        return createBreadCrumbs(
          [],
          self.sortedItems,
          self.activeItem
        );
      }
    }
  ) || {};
