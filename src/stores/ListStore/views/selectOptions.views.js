/* eslint-disable no-param-reassign */
import { assign } from '../helpers';

/**
 * This function returs a views function that exposes props to get options {label, value} for each select filter.
 * So, if you supply a (sortFilters) option with a filter that has name: "categories",
 * you will be able to access options for categories using (self.categoriesOptions)
 */
export default selectFilters => self =>
  selectFilters?.reduce((prev, filter) => {
    const filterName = `${filter.name}Filter`;
    const optionsName = `${filter.name}Options`;
    const currentOptionsName = `current_${filter.name}Options`;
    prev = assign(prev, {
      get [optionsName]() {
        return self[filter.name].map(item =>
          typeof item === 'object' && item.id && item.name
            ? { label: item.name, value: item }
            : {
                label: item,
                value:
                  self[filterName]?.includes(item) || false
              }
        );
      },
      get [currentOptionsName]() {
        return self[`current_${filter.name}`].map(item =>
          typeof item === 'object' && item.id && item.name
            ? { label: item.name, value: item }
            : {
                label: item,
                value:
                  self[filterName]?.includes(item) || false
              }
        );
      }
    });
    return prev;
  }, {}) || {};
