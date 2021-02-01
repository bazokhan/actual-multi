/* eslint-disable no-console */
import store, { items } from './test-store';

const { expect, it, beforeAll } = global;

const originalWarn = console.warn.bind(console.warn);
console.log = console.log;

store.updateItems(items);
describe('Select Tests', () => {
  beforeAll(() => {
    console.warn = msg =>
      !msg.toString().includes('indexedDB') &&
      originalWarn(msg);
  });
  it('Select Multi Filters Work', () => {
    expect(store.categoriesFilter).not.toBeNull();
    store.addCategoriesFilter('Games');
    expect(store.categoriesFilter).toHaveLength(1);
    expect(store.categoriesFilter).toContain('Games');
    expect(store.filteredItems).toHaveLength(1);
    expect(store.filteredItems[0].name).toBe('MineCraft');
    store.toggleCategoriesFilter('Music');
    expect(store.categoriesFilter).toHaveLength(2);
    expect(store.categoriesFilter).toContain('Games');
    expect(store.categoriesFilter).toContain('Music');
    expect(store.filteredItems).toHaveLength(2);
    store.removeCategoriesFilter('Music');
    expect(store.categoriesFilter).toHaveLength(1);
    expect(store.categoriesFilter).toContain('Games');
    expect(store.categoriesFilter).not.toContain('Music');
    expect(store.filteredItems).toHaveLength(1);
    expect(store.filteredItems[0].name).toBe('MineCraft');
    store.resetFilters();
    expect(store.categoriesFilter).toHaveLength(0);
    store.updateItems(items);
  });

  it('Select Single Filters Work', () => {
    expect(store.statusFilter).not.toBeNull();
    store.addStatusFilter('Active');
    expect(store.statusFilter).toBe('Active');
    expect(store.filteredItems).toHaveLength(1);
    expect(store.filteredItems[0].name).toBe('MineCraft');
    store.addStatusFilter('Pending');
    expect(store.statusFilter).toBe('Pending');
    expect(store.filteredItems).toHaveLength(1);
    expect(store.filteredItems[0].name).toBe('HipHop');
    store.removeStatusFilter();
    expect(store.statusFilter).toBe('');
    expect(store.filteredItems).toHaveLength(2);
    expect(store.filteredItems.map(i => i.name)).toContain(
      'MineCraft'
    );
    expect(store.filteredItems.map(i => i.name)).toContain(
      'HipHop'
    );
    store.resetFilters();
    expect(store.statusFilter).toBe('');
    store.updateItems(items);
  });

  it('Multiple Select Filters Work Together', () => {
    store.updateItems([
      ...items,
      {
        id: '3',
        name: 'AOE',
        moreDetails: { category: 'Games' },
        status: 'Pending'
      }
    ]);
    store.addStatusFilter('Pending');
    expect(store.statusFilter).toBe('Pending');
    expect(store.filteredItems).toHaveLength(2);
    store.addCategoriesFilter('Games');
    expect(store.statusFilter).toBe('Pending');
    expect(store.categoriesFilter).toContain('Games');
    expect(store.filteredItems).toHaveLength(1);
    expect(store.filteredItems[0].name).toBe('AOE');
    store.resetFilters();
    expect(store.categoriesFilter).toHaveLength(0);
    store.updateItems(items);
  });
});
