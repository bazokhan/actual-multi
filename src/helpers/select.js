import { gql } from '@apollo/client';
import getQueryFromModel from './getQueryFromModel';

const select = (modelName, model = null, queries = {}) =>
  gql`
  query ${modelName} {
    ${getQueryFromModel(modelName, model, queries)}
  }
  `;

export default select;
