import { gql } from '@apollo/client';
import getQueryFromModel from './getQueryFromModel';

const select = (
  modelName,
  model = null,
  queries = {},
  params = null
) =>
  gql`
  query ${modelName}${params || ''} {
    ${getQueryFromModel(modelName, model, queries)}
  }
  `;

export default select;
