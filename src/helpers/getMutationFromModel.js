/* eslint-disable no-underscore-dangle */
const getMutationFromModel = (
  modelName,
  model = null,
  originalModelName
) => {
  if (!model) return modelName;
  if (
    Array.isArray(model._defaultValue) &&
    model._subtype
  ) {
    return `${modelName}\n${getMutationFromModel(
      '',
      model._subtype?._subType,
      originalModelName
    )}`;
  }
  if (!model.properties) return modelName;
  return `${
    modelName === originalModelName ? '' : `${modelName}{\n`
  }${Object.entries(model.properties)
    .map(([propName, propValue]) =>
      getMutationFromModel(
        propName,
        propValue,
        originalModelName
      )
    )
    .join('\n')}${
    modelName === originalModelName ? '' : `}`
  }`;
};

export default getMutationFromModel;
