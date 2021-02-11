/* eslint-disable no-param-reassign */
import { types } from 'mobx-state-tree';
import indexedActions from '../actions/indexed.actions';
import itemActions from '../actions/item.actions';
import searchActions from '../actions/search.actions';
import selectActions from '../actions/select.actions';
import switchActions from '../actions/switch.actions';
import sortActions from '../actions/sort.actions';
import filterActions from '../actions/filter.actions';
import columnsActions from '../actions/columns.actions';
import viewModeActions from '../actions/viewMode.actions';
import columnsViews from '../views/columns.views';
import itemsViews from '../views/item.views';
import mainViews from '../views/main.views';
import selectViews from '../views/select.views';
import selectFilterViews from '../views/selectFilter.views';
import selectOptionsViews from '../views/selectOptions.views';
import mainModel from '../models/main.model';
import searchModel from '../models/search.model';
import selectModel from '../models/select.model';
import switchModel from '../models/switch.model';
import addonModel from '../models/addon.model';
import addonViews from '../views/addon.views';
import addonActions from '../actions/addon.actions';
import extendModel from './extendModel';
import applyAddons from './applyAddons';
import switchFilterViews from '../views/switchFilter.views';

const generateListModel = (
  model,
  registeredAddons,
  options = {}
) => {
  const {
    searchFilters,
    selectFilters,
    switchFilters,
    sortFilters,
    modelName,
    extend,
    addons
  } = options;
  const appliedAddons = applyAddons(
    registeredAddons,
    addons
  );
  const extendedModel = extendModel({
    model,
    addons,
    appliedAddons
  });
  return types
    .model(modelName || 'ListModel', {
      ...mainModel({ sortFilters, extendedModel }),
      ...searchModel(searchFilters),
      ...selectModel(selectFilters),
      ...switchModel(switchFilters),
      ...addonModel({ appliedAddons, addons }),
      ...(extend?.model || {})
    })
    .views(columnsViews)
    .views(itemsViews(sortFilters))
    .views(selectViews(selectFilters))
    .views(selectFilterViews(selectFilters))
    .views(switchFilterViews(switchFilters))
    .views(selectOptionsViews(selectFilters))
    .views(addonViews({ appliedAddons, addons }))
    .views(
      mainViews({
        searchFilters,
        selectFilters,
        switchFilters
      })
    )
    .views(extend?.views || (() => ({})))
    .actions(itemActions)
    .actions(indexedActions)
    .actions(searchActions(searchFilters))
    .actions(selectActions(selectFilters))
    .actions(switchActions(switchFilters))
    .actions(addonActions({ appliedAddons, addons }))
    .actions(
      filterActions({
        searchFilters,
        selectFilters,
        switchFilters
      })
    )
    .actions(viewModeActions)
    .actions(sortActions)
    .actions(columnsActions)
    .actions(extend?.actions || (() => ({})));
};

export default generateListModel;
