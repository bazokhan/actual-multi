/* eslint-disable no-param-reassign */
import { getParent } from 'mobx-state-tree';
import { assign } from '../helpers';

const extendModel = ({
  model,
  appliedAddons,
  addons = []
}) => {
  const initialModel = model;
  const initialViews = self => ({
    get isActive() {
      return getParent(self, 2).activeItemID === self.id;
    },
    get isSelected() {
      if (getParent(self, 2).idFilter) {
        return getParent(self, 2).idFilter?.includes?.(
          self.id
        );
      }
      return false;
    }
  });
  const initialActions = self => ({
    updateIndex: newIndex => {
      if (self.index !== undefined) {
        self.index = newIndex;
      }
    }
  });
  const addonModel =
    addons?.reduce((prev, addon) => {
      prev.properties = {
        ...prev.properties,
        ...appliedAddons[addon.name].itemModel
      };
      prev.propertyNames = [
        ...prev.propertyNames,
        ...Object.keys(appliedAddons[addon.name].itemModel)
      ];
      return prev;
    }, initialModel) || initialModel;
  const addonViews = self =>
    addons?.reduce((prev, addon) => {
      if (!prev) {
        prev = initialViews(self);
      }
      prev = assign(
        prev,
        appliedAddons[addon.name].itemViews(self)
      );
      return prev;
    }, null) || initialViews(self);
  const addonActions = self =>
    addons?.reduce((prev, addon) => {
      if (!prev) {
        prev = initialActions(self);
      }

      prev = assign(
        prev,
        appliedAddons[addon.name].itemActions(self)
      );
      return prev;
    }, null) || initialActions(self);
  return addonModel.views(addonViews).actions(addonActions);
};

export default extendModel;
