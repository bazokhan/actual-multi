const REPORT_PROPS = [
  {
    name: 'account',
    itemIdentifier: item => item.account?.id,
    chunkIdentifier: item => item.account,
    validator: (c, item) =>
      c.identifier.id === item.account?.id
  },
  {
    name: 'date',
    itemIdentifier: item => item.date,
    chunkIdentifier: item => ({
      id: `${item.date?.getFullYear()} / ${
        item.date?.getMonth() + 1
      }`,
      name: `${item.date?.getFullYear()} / ${
        item.date?.getMonth() + 1
      }`,
      value: item.date
    }),
    validator: (c, item) =>
      c.identifier.value?.getMonth() ===
        item.date?.getMonth() &&
      c.identifier.value?.getFullYear() ===
        item.date?.getFullYear()
  },
  {
    name: 'type',
    itemIdentifier: item => item.amount < 0,
    chunkIdentifier: item =>
      item.amount > 0
        ? {
            id: 'recieved',
            name: 'recieved',
            value: false
          }
        : { id: 'paid', name: 'paid', value: true },
    validator: (c, item) =>
      c.identifier.value === item.amount < 0
  },
  {
    name: 'category',
    itemIdentifier: item => item.category?.id,
    chunkIdentifier: item => item.category,
    validator: (c, item) =>
      c.identifier.id === item.category?.id
  },
  {
    name: 'payee',
    itemIdentifier: item => item.payee?.id,
    chunkIdentifier: item => item.payee,
    validator: (c, item) =>
      c.identifier.id === item.payee?.id
  }
];

export default REPORT_PROPS;
