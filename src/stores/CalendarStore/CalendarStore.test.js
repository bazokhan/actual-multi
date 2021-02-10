/* eslint-disable no-console */
import CalendarStore from '.';

const { describe, it, expect, beforeAll } = global;

const store = CalendarStore.create({});

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

describe('Calendar Store', () => {
  it('should be created with default values', () => {
    expect(store).not.toBeNull();

    store.calendarStartDate.updateDate(
      new Date('11/24/2020')
    );
    store.calendarEndDate.updateDate(
      new Date('11/29/2020')
    );
    console.log(store.calendarDateRange);

    expect(store.calendarDateRange).not.toBeNull();
    expect(store.calendarDateRange).toHaveLength(6);
  });
});
