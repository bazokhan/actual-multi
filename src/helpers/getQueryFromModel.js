/* eslint-disable no-underscore-dangle */
const getQueryFromModel = (
  modelName,
  model = null,
  queries = {}
) => {
  if (!model) return modelName;
  if (
    Array.isArray(model._defaultValue) &&
    model._subtype
  ) {
    return `${modelName}${
      queries[modelName]
        ? `(where: ${JSON.stringify(
            queries[modelName]
          ).replace(/"/g, '')})`
        : ''
    }\n${getQueryFromModel(
      '',
      model._subtype?._subType,
      queries
    )}`;
  }
  if (!model.properties) return modelName;
  return `${modelName}${
    queries[modelName]
      ? `(where: ${JSON.stringify(
          queries[modelName]
        ).replace(/"/g, '')})`
      : ''
  }{\n${Object.entries(model.properties)
    .map(([propName, propValue]) =>
      getQueryFromModel(propName, propValue, queries)
    )
    .join('\n')}}`;
};

export default getQueryFromModel;
