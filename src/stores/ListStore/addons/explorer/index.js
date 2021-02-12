import itemActions from './itemActions';
import actions from './actions';
import itemModel from './itemModel';
import itemViews from './itemViews';
import model from './model';
import views from './views';

const addExplorerAddon = (options = {}) => {
  const { fileTypes } = options;
  return {
    model,
    views: views(fileTypes),
    actions,
    itemModel: itemModel(fileTypes),
    itemViews,
    itemActions
  };
};

export default addExplorerAddon;
