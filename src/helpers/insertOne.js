import { gql } from '@apollo/client';
import getMutationFromModel from './getMutationFromModel';

const insertOne = (modelName, model = null) => gql`
mutation insert_${modelName}_one($${modelName}One: ${modelName}_insert_input!) {
    insert_${modelName}_one(object: $${modelName}One) {
        ${getMutationFromModel(modelName, model, modelName)}
    }
}
`;

export default insertOne;
