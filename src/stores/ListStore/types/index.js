import { types } from 'mobx-state-tree';

export const OptionalString = types.maybeNull(
  types.optional(types.string, '')
);
export const OptionalEmptyString = types.optional(
  types.string,
  ''
);
