/* eslint-disable no-param-reassign */
import { types } from 'mobx-state-tree';

export default switchFilters =>
  switchFilters?.length
    ? switchFilters.reduce((prev, filter) => {
        prev[`${filter.name}Filter`] = types.optional(
          types.boolean,
          false
        );
        return prev;
      }, {})
    : {};
