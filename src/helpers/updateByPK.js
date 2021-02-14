import { gql } from '@apollo/client';
import getMutationFromModel from './getMutationFromModel';

const updateByPK = (modelName, model = null) => gql`
mutation update_${modelName}_by_pk($id: uuid!, $set: ${modelName}_set_input) {
    update_${modelName}_by_pk(pk_columns: {id: $id} , _set: $set) {
        ${getMutationFromModel(modelName, model, modelName)}
    }
}
`;

export default updateByPK;
