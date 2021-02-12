/* eslint-disable no-console */
import store, {
  items,
  unsortedColumns,
  sortColumns
} from './test-store';

const { expect, it, beforeAll } = global;

const originalWarn = console.warn.bind(console.warn);
const originalLog = console.log.bind(console.log);
const originalError = console.error.bind(console.error);

beforeAll(() => {
  console.warn = msg => {
    if (
      msg?.toString().includes('indexedDB') ||
      msg?.toString().includes('Dexie')
    )
      return;
    originalWarn(msg);
  };
  console.log = msg => {
    if (
      msg?.toString().includes('indexedDB') ||
      msg?.toString().includes('Dexie')
    )
      return;
    originalLog(msg);
  };
  console.error = msg => {
    if (
      msg?.toString().includes('indexedDB') ||
      msg?.toString().includes('Dexie')
    )
      return;
    originalError(msg);
  };
});

store.updateItems(items);

describe('Columns Tests', () => {
  beforeAll(() => {
    console.warn = msg =>
      !msg?.toString().includes('indexedDB') &&
      originalWarn(msg);
  });
  it('Updating Columns Work', () => {
    expect(store.columnsArray).not.toBeUndefined();
    store.updateColumns(unsortedColumns);
    expect(store.columnsArray).toHaveLength(2);
    expect(store.columnsArray[0].label).toBe('status');
    expect(store.columnsArray[0].show).toBe(false);
    expect(store.columnsArray[0].index).toBeNull();
  });

  it('Sorted Columns Work', () => {
    expect(store.sortedColumns).not.toBeUndefined();
    store.updateColumns(sortColumns);
    expect(store.sortedColumns).toHaveLength(2);
    expect(store.sortedColumns[0].label).toBe('category');
    expect(store.sortedColumns[0].show).toBe(true);
    expect(store.sortedColumns[0].index).toBe(0);
    expect(store.sortedColumns[1].label).toBe('status');
    expect(store.sortedColumns[1].show).toBe(false);
    expect(store.sortedColumns[1].index).toBe(1);
  });

  it('Visible Columns Work', () => {
    expect(store.visibleColumns).not.toBeUndefined();
    store.updateColumns(sortColumns);
    expect(store.visibleColumns).toHaveLength(1);
    expect(store.visibleColumns[0].label).toBe('category');
    expect(store.visibleColumns[0].show).toBe(true);
    expect(store.visibleColumns[0].index).toBe(0);
  });

  it('Active Columns Work', () => {
    expect(store.activeColumns).not.toBeUndefined();
    store.updateColumns(sortColumns);
    expect(Object.keys(store.activeColumns).length).toBe(2);
    expect(store.activeColumns.status.show).toBe(false);
    expect(store.activeColumns.category.show).toBe(true);
  });
});
