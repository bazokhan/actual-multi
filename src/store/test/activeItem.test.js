/* eslint-disable no-console */
import store, { items } from './test-store';

const { expect, it, beforeAll } = global;

const originalWarn = console.warn.bind(console.warn);
console.log = console.log;

store.updateItems(items);
describe('Active Item Tests', () => {
  beforeAll(() => {
    console.warn = msg =>
      !msg.toString().includes('indexedDB') &&
      originalWarn(msg);
  });
  it('Selecting Items Work', () => {
    expect(store.activeItemID).toBe('');
    expect(store.activeItem).toBeUndefined();
    store.selectItem({ id: '2' });
    expect(store.activeItemID).not.toBeNull();
    expect(store.activeItemID).toBe('2');
    expect(store.activeItem).not.toBeUndefined();
    expect(store.activeItem.id).toBe('2');
    store.selectItem(null);
    expect(store.activeItemID).toBe('');
    expect(store.activeItem).toBeUndefined();
  });
});
