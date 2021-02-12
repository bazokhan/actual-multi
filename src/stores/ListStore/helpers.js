/* eslint-disable */
export const createBreadCrumbs = (
  prev,
  allItems,
  activeItem
) => {
  if (prev[0]?.id === 'MAIN_WINDOW') return prev;
  const parentFile = allItems.find(
    item => item?.id === activeItem?.parentID
  );
  if (!parentFile) return [activeItem, ...prev];
  return [
    ...createBreadCrumbs(
      [activeItem],
      allItems,
      parentFile
    ),
    ...prev
  ];
};

// https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript
export const nest = (
  items,
  id = 'ROOT',
  link = 'parentID'
) =>
  items
    .filter(item => item[link] === id)
    .map(item => ({
      ...item,
      children: nest(items, item.id)
    }));

// https://webreflection.co.uk/blog/2015/10/06/how-to-copy-objects-in-javascript
export function assign(target) {
  for (
    let hOP = Object.prototype.hasOwnProperty,
      copy = function(key) {
        if (!hOP.call(target, key)) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(this, key)
          );
        }
      },
      i = arguments.length;
    1 < i--;
    Object.keys(arguments[i]).forEach(copy, arguments[i])
  ) {}
  return target;
}
