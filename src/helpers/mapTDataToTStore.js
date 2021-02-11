const mapTDataToTStore = (t, index) => ({
  ...t,
  date: new Date(t.date),
  created_at: new Date(t.created_at),
  updated_at: new Date(t.updated_at),
  index
});

export default mapTDataToTStore;
