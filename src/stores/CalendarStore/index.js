/* eslint-disable no-param-reassign */
import { getSnapshot, types } from 'mobx-state-tree';
import dateRange from '../../helpers/dateRange';
import generate from '../ListStore';
import CalendarEventStore from './CalendarEvent.store';
import DateStore from './Date.store';

const CalendarStore = types
  .model('Calendar', {
    calendarDate: types.optional(
      DateStore,
      getSnapshot(DateStore.create({ raw: new Date() }))
    ),
    calendarStartDate: types.optional(
      DateStore,
      getSnapshot(DateStore.create({ raw: new Date() }))
    ),
    calendarEndDate: types.optional(
      DateStore,
      getSnapshot(DateStore.create({ raw: new Date() }))
    ),
    datePickerDate: types.maybeNull(DateStore),
    datePickerStartDate: types.maybeNull(DateStore),
    datePickerEndDate: types.maybeNull(DateStore),
    newEvent: types.optional(CalendarEventStore, {
      id: 'NEW_EVENT'
    }),
    events: types.optional(generate(CalendarEventStore), {})
  })
  .views(self => ({
    get today() {
      return DateStore.create({ raw: new Date() });
    },
    get calendarDateRange() {
      return dateRange(
        self.calendarStartDate.raw,
        self.calendarEndDate.raw
      );
    }
  }))
  .actions(self => ({
    resetNewEvent: () => {
      self.newEvent.updateTitle('');
      self.newEvent.updateDate(null);
      self.newEvent.updateContent({});
    }
  }));

export default CalendarStore;
