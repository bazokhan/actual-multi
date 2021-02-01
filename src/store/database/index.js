import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import Dexie from 'dexie';
import uuid from 'uuid/v4';

const db = new Dexie('SYFT');

db.version(3)
  .stores({
    apps: 'id, name',
    userTypes: 'id, name',
    viewModes: 'id, name',
    lists: 'id, name, appID, userTypeID, viewModeID',
    sortings: 'id, listID, mode, criteria',
    columns: 'id, listID, order'
  })
  .upgrade(transaction =>
    transaction
      .table('apps')
      .toCollection()
      .modify(app => {
        if (app.name === 'campaing-manager') {
          // eslint-disable-next-line no-param-reassign
          app.name = 'campaign-manager';
        }
      })
  );

db.open().catch(err => {
  // eslint-disable-next-line no-console
  console.log('Opening error', err);
});

const loadDB = async () => {
  try {
    await db.apps.bulkAdd([
      { id: '1', name: 'creator-manager' },
      { id: '2', name: 'campaign-manager' }
    ]);
    await db.userTypes.bulkAdd([
      { id: '1', name: 'Brand' }
    ]);
    await db.viewModes.bulkAdd([
      { id: '1', name: 'list' },
      { id: '2', name: 'card' }
    ]);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

export const addList = async listData => {
  try {
    const appID = (
      await db.apps.get({ name: listData.app })
    )?.id;
    const userTypeID = (
      await db.userTypes.get({
        name: listData.userType
      })
    )?.id;
    const viewModeID = (
      await db.viewModes.get({
        name: listData.viewMode
      })
    )?.id;
    const listID = await db.lists.put({
      id: uuid(),
      name: listData.name,
      appID,
      userTypeID,
      viewModeID
    });
    const list = await db.lists.get({ id: listID });
    return list;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return null;
  }
};

export const getColumns = async (
  listID,
  columnsData = null
) => {
  let columns = null;
  try {
    columns = await db.columns.get({ listID });
    if (!columns) {
      if (!columnsData) return columns;
      const newColumnsId = await db.columns.add({
        ...columnsData,
        id: uuid(),
        listID
      });
      columns = await db.columns.get({ id: newColumnsId });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return columns;
};

export const getSorting = async (
  listID,
  sortingData = null
) => {
  let sorting = null;
  try {
    sorting = await db.sortings.get({ listID });
    if (!sorting) {
      if (!sortingData) return sorting;
      const newSortingId = await db.sortings.add({
        ...sortingData,
        id: uuid(),
        listID
      });
      sorting = await db.sortings.get({ id: newSortingId });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return sorting;
};

export const upsertColumns = async columnsData => {
  try {
    const columnsID = await db.columns.put(columnsData);
    const columns = await db.columns.get({ id: columnsID });
    return columns;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return null;
  }
};

export const upsertSorting = async sortingData => {
  try {
    const sortingID = await db.sortings.put(sortingData);
    const sortings = await db.sortings.get({
      id: sortingID
    });
    return sortings;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return null;
  }
};

export const getList = async listName => {
  const list = await db.lists.get({ name: listName });
  return list;
};

export const upsertList = async listData => {
  let list = null;
  try {
    list = await getList(listData.name);
    if (!list) {
      list = await addList(listData);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    list = await addList(listData);
    return list;
  }
  return list;
};

const LocalstorageContext = createContext({ db: null });

export const useLocalstorage = () =>
  useContext(LocalstorageContext);

loadDB();

const LocalstorageProvider = ({ children }) => (
  <LocalstorageContext.Provider
    value={{
      db,
      addList,
      getList,
      upsertList,
      getColumns,
      upsertColumns,
      getSorting,
      upsertSorting
    }}
  >
    {children}
  </LocalstorageContext.Provider>
);

LocalstorageProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default LocalstorageProvider;
