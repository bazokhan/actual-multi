/* eslint-disable no-console */
import store, { items } from './test-store';

const { expect, it, beforeAll } = global;

const originalWarn = console.warn.bind(console.warn);
const originalLog = console.log.bind(console.log);
const originalError = console.error.bind(console.error);

beforeAll(() => {
  console.warn = msg => {
    if (
      msg.toString().includes('indexedDB') ||
      msg.toString().includes('Dexie')
    )
      return;
    originalWarn(msg);
  };
  console.log = msg => {
    if (
      msg.toString().includes('indexedDB') ||
      msg.toString().includes('Dexie')
    )
      return;
    originalLog(msg);
  };
  console.error = msg => {
    if (
      msg.toString().includes('indexedDB') ||
      msg.toString().includes('Dexie')
    )
      return;
    originalError(msg);
  };
});

store.updateItems(items);

describe('Custom Item Order Tests', () => {
  beforeAll(() => {
    console.warn = msg =>
      !msg.toString().includes('indexedDB') &&
      originalWarn(msg);
  });
  it('Updating Item Order Work', () => {
    store.updateItems(items);
    expect(store.sortedItems[0].id).toBe('1');
    store.updateItemsOrder([{ id: '2' }, { id: '1' }]);
    expect(store.sortedItems[0].id).toBe('2');
  });
});
