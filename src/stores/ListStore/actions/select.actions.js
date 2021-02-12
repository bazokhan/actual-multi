/* eslint-disable no-param-reassign */
export default selectFilters =>
  selectFilters?.length
    ? self =>
        selectFilters.reduce((prev, filter) => {
          const add = `add${filter.name[0].toUpperCase()}${filter.name.slice(
            1
          )}Filter`;
          const remove = `remove${filter.name[0].toUpperCase()}${filter.name.slice(
            1
          )}Filter`;
          const toggle = `toggle${filter.name[0].toUpperCase()}${filter.name.slice(
            1
          )}Filter`;
          const filterName = `${filter.name}Filter`;
          prev = {
            ...prev,
            [add]: item => {
              if (
                typeof item === 'object' &&
                item.value?.id
              ) {
                if (filter.isMulti) {
                  self[filterName].push(item.value.id);
                } else {
                  self[filterName] = item.value.id;
                }
              } else if (filter.isMulti) {
                self[filterName].push(item);
              } else {
                self[filterName] = item;
              }
            },
            [remove]: item => {
              if (
                typeof item === 'object' &&
                item.value?.id
              ) {
                if (filter.isMulti) {
                  self[filterName] = self[
                    filterName
                  ].filter(f => f !== item.value.id);
                } else {
                  self[filterName] = '';
                }
              } else if (filter.isMulti) {
                self[filterName] = self[filterName].filter(
                  f => f !== item
                );
              } else {
                self[filterName] = '';
              }
            },
            [toggle]: item => {
              if (
                typeof item === 'object' &&
                item.value?.id
              ) {
                if (
                  self[filterName].includes(item.value.id)
                ) {
                  self[remove](item);
                } else {
                  self[add](item);
                }
              } else if (self[filterName].includes(item)) {
                self[remove](item);
              } else {
                self[add](item);
              }
            }
          };
          return prev;
        }, {})
    : () => ({});
