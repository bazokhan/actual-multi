/* eslint-disable no-param-reassign */
import addExplorerAddon from './explorer';
import addHistoryAddon from './history';
import addSubListAddon from './subList';

const ADDONS = {
  explorer: addExplorerAddon,
  subList: addSubListAddon,
  history: addHistoryAddon
};

export default ADDONS;
