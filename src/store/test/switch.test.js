/* eslint-disable no-console */
import store, { items } from './test-store';

const { expect, it, beforeAll } = global;

const originalWarn = console.warn.bind(console.warn);
console.dev = console.log;

store.updateItems(items);
describe('Switch Tests', () => {
  beforeAll(() => {
    console.warn = msg =>
      !msg.toString().includes('indexedDB') &&
      originalWarn(msg);
  });
  it('Switch Filters Work', () => {
    store.updateItems([
      ...items,
      {
        id: '3',
        name: 'AOE',
        moreDetails: { category: 'Games' },
        status: 'Pending',
        price: 'Product Only'
      }
    ]);
    expect(store.filteredItems).toHaveLength(3);
    expect(store.productOnlyFilter).not.toBeNull();
    expect(store.productOnlyFilter).toBe(false);
    store.toggleProductOnlyFilter();
    expect(store.productOnlyFilter).toBe(true);
    expect(store.filteredItems).toHaveLength(1);
    expect(store.filteredItems[0].name).toBe('AOE');
    store.resetFilters();
    expect(store.productOnlyFilter).toBe(false);
    store.updateItems(items);
  });
});
