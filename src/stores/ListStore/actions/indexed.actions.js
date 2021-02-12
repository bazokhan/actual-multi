/* eslint-disable no-param-reassign */
import {
  getColumns,
  getSorting,
  upsertColumns,
  upsertList,
  upsertSorting
} from '../database';

export default self => ({
  initialize: ({
    name,
    appType,
    app,
    defaultViewMode = 'list'
  }) => {
    if (!name || typeof window === 'undefined') return;
    upsertList({
      name,
      viewMode: defaultViewMode,
      userType: appType,
      app
    })
      .then(res => {
        self.updateDatabaseID(res?.id);
        if (self.databaseID) {
          getColumns(self.databaseID, {
            order: self.activeColumns
          })
            .then(columnsRes => {
              self.updateActiveColumns(columnsRes?.order);
              self.updateDatabaseColumnsID(columnsRes?.id);
            })
            .catch(() => {});
        }
        if (self.databaseID) {
          getSorting(self.databaseID, {
            criteria: null,
            mode: 'desc'
          })
            .then(sortingRes => {
              self.updateDatabaseSortingID(sortingRes?.id);
              self.sort(
                sortingRes?.criteria,
                sortingRes?.mode
              );
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  },
  updateDatabaseID: id => {
    self.databaseID = id;
  },
  updateDatabaseColumnsID: columnsID => {
    self.databaseColumnsID = columnsID;
  },
  updateDatabaseSortingID: sortingID => {
    self.databaseSortingID = sortingID;
  },
  saveSortingInDB: () => {
    if (self.databaseID && self.databaseSortingID) {
      upsertSorting({
        id: self.databaseSortingID,
        listID: self.databaseID,
        criteria: self.sortFilterID,
        mode: self.sortMode
      })
        .then(res => {
          self.updateDatabaseSortingID(res?.id);
          if (
            res?.criteria === self.sortFilterID &&
            res?.mode === self.sortMode
          )
            return;
          self.sort(res?.criteria, res?.mode);
        })
        .catch(() => {});
    }
  },
  saveColumnsInDB: () => {
    if (self.databaseColumnsID && self.databaseID) {
      upsertColumns({
        id: self.databaseColumnsID,
        listID: self.databaseID,
        order: self.activeColumns
      }).catch(() => {});
    }
  }
});
