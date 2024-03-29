/* eslint-disable no-param-reassign */
import { types } from 'mobx-state-tree';
import { MONTHS } from '../../constants';
import formatDate from '../../helpers/formatDate';
import getDaysInMonth from '../../helpers/getDaysInMonth';
import getDaysInMonthWithOffset from '../../helpers/getDaysInMonthWithOffset';

const DateStore = types
  .model('Date', {
    raw: types.Date,
    mode: types.optional(
      types.enumeration(['day', 'week', 'month', 'year']),
      'month'
    ),
    position: types.maybeNull(
      types.model({ x: types.number, y: types.number })
    )
  })
  .views(self => ({
    get string() {
      return formatDate(self.raw);
    },
    get mdy() {
      return formatDate(self.raw, 'mdy');
    },
    get year() {
      return self.raw.getFullYear();
    },
    get month() {
      return self.raw.getMonth();
    },
    get monthString() {
      return MONTHS[self.month];
    },
    get monthInitials() {
      return self.monthString.slice(0, 3).toUpperCase();
    },
    get day() {
      return self.raw.getDate();
    },
    get daysInCurrentMonth() {
      return getDaysInMonth({
        month: self.month,
        year: self.year
      });
    },
    get prevMonthDate() {
      const temp = new Date(self.raw);
      temp.setDate(0);
      return temp;
    },
    get nextMonthDate() {
      const temp = new Date(self.raw);
      temp.setDate(self.daysInCurrentMonth.length + 1);
      return temp;
    },
    get daysInPrevMonth() {
      return getDaysInMonthWithOffset({
        date: self.prevMonthDate,
        offsetLeft: self.daysInCurrentMonth[0].getDay() // The needed days of prev month starting from sunday
      });
    },
    get daysInNextMonth() {
      return getDaysInMonthWithOffset({
        date: self.nextMonthDate,
        offsetRight:
          6 -
          self.daysInCurrentMonth[
            self.daysInCurrentMonth.length - 1
          ].getDay() // The needed days of next month starting from sunday
      });
    },
    get displayDays() {
      return [
        self.daysInPrevMonth,
        self.daysInCurrentMonth,
        self.daysInNextMonth
      ].flat();
    },
    get timestamp() {
      return self.raw.getTime();
    }
  }))
  .actions(self => ({
    updateDate: newDate => {
      self.raw = new Date(newDate);
    },
    updateMode: newMode => {
      self.mode = newMode;
    },
    updatePosition: newPosition => {
      self.position = newPosition;
    }
  }));

export default DateStore;
