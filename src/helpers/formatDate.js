const formatDate = (date, format = 'dmy') => {
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = `${date.getFullYear()}`;

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return format === 'dmy'
    ? [day, month, year].join(' / ')
    : format === 'mdy'
    ? [month, day, year].join(' / ')
    : [year, month, day].join(' / ');
};

export default formatDate;
