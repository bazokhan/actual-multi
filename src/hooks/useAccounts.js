import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import AccountRelationStore from '../models/AccountRelation.store';
import select from '../helpers/select';

const useAccounts = () => {
  const { data: accountsData, loading, error } = useQuery(
    select('accounts', AccountRelationStore, {
      accounts: { tombstone: { _eq: 0 } }
    }),
    {
      fetchPolicy: 'no-cache'
    }
  );

  const accounts = useMemo(() => accountsData?.accounts, [
    accountsData
  ]);

  return { accounts, loading, error };
};

export default useAccounts;
