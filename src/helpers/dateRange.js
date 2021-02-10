const dateRange = (start, end) => {
  const arr = [];
  for (
    let i = new Date(start);
    i.getTime() <= end.getTime();
    i.setDate(i.getDate() + 1)
  ) {
    arr.push(new Date(i));
  }
  return arr;
};

export default dateRange;
