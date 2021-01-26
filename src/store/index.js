import generateListModel from './initializers/generateListModel';
import ADDONS from './addons';

const generate = (model, options) =>
  generateListModel(model, ADDONS, options);

export default generate;
