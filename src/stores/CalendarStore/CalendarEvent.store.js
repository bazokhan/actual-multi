/* eslint-disable no-param-reassign */
import { types } from 'mobx-state-tree';

const CalendarEventStore = types
  .model('CalednarEvent', {
    id: types.identifier,
    title: types.optional(types.string, ''),
    date: types.maybeNull(types.Date),
    contentRaw: types.maybeNull(types.string)
  })
  .views(self => ({
    get content() {
      if (self.contentRaw)
        return JSON.parse(self.contentRaw);
      return self.contentRaw;
    }
  }))
  .actions(self => ({
    updateTitle: newTitle => {
      self.title = newTitle;
    },
    updateDate: newDate => {
      self.date = newDate;
    },
    updateContent: newContent => {
      self.contentRaw = JSON.stringify(newContent);
    }
  }));

export default CalendarEventStore;
