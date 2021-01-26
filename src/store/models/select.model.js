/* eslint-disable no-param-reassign */
import { types } from 'mobx-state-tree';
import {
  OptionalEmptyString,
  OptionalString
} from '../types';

export default selectFilters =>
  selectFilters?.length
    ? selectFilters.reduce((prev, filter) => {
        const filterName = `${filter.name}Filter`;
        prev[filterName] = filter.isMulti
          ? types.optional(types.array(OptionalString), [])
          : OptionalEmptyString;
        return prev;
      }, {})
    : {};
