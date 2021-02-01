/* eslint-disable no-console */
import store, { items } from './test-store';

const { expect, it, beforeAll } = global;

const originalWarn = console.warn.bind(console.warn);
console.log = console.log;

store.updateItems(items);
describe('Search Tests', () => {
  beforeAll(() => {
    console.warn = msg =>
      !msg.toString().includes('indexedDB') &&
      originalWarn(msg);
  });
  it('Search Filters Work', () => {
    expect(store.nameFilter).not.toBeNull();
    store.changeNameFilter('MineCraft');
    expect(store.nameFilter).toBe('MineCraft');
    expect(store.filteredItems).toHaveLength(1);
    expect(store.filteredItems[0].name).toBe('MineCraft');
    store.changeNameFilter('iph');
    expect(store.nameFilter).toBe('iph');
    expect(store.filteredItems).toHaveLength(1);
    expect(store.filteredItems[0].name).toBe('HipHop');
    store.changeNameFilter('i');
    expect(store.nameFilter).toBe('i');
    expect(store.filteredItems).toHaveLength(2);
    expect(store.filteredItems.map(i => i.name)).toContain(
      'MineCraft'
    );
    expect(store.filteredItems.map(i => i.name)).toContain(
      'HipHop'
    );
    store.resetFilters();
    expect(store.nameFilter).toBe('');
    store.updateItems(items);
  });
});
