const sum = arr =>
  arr?.reduce(
    (previous, transaction) =>
      previous + transaction.amount,
    0
  ) || 0;

export default sum;
