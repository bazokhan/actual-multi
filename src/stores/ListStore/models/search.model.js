/* eslint-disable no-param-reassign */
import { OptionalEmptyString } from '../types';

export default searchFilters =>
  searchFilters?.length
    ? searchFilters.reduce((prev, filter) => {
        prev[`${filter.name}Filter`] = OptionalEmptyString;
        return prev;
      }, {})
    : {};
