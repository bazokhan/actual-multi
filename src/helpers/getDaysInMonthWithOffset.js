const getDaysInMonthWithOffset = ({
  date,
  offsetLeft,
  offsetRight
}) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const tempDate = new Date(year, month, 1);
  const numberOfDays = new Date(
    year,
    month + 1,
    0
  ).getDate();
  const days = [];
  if (offsetLeft) {
    tempDate.setDate(numberOfDays - offsetLeft + 1);
    while (tempDate.getMonth() === month) {
      days.push(new Date(tempDate));
      tempDate.setDate(tempDate.getDate() + 1);
    }
  }
  if (offsetRight) {
    tempDate.setDate(1);
    while (
      tempDate.getMonth() === month &&
      tempDate.getDate() <= offsetRight
    ) {
      days.push(new Date(tempDate));
      tempDate.setDate(tempDate.getDate() + 1);
    }
  }
  return days;
};

export default getDaysInMonthWithOffset;
