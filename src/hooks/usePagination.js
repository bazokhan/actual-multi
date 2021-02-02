import {
  useState,
  useCallback,
  useMemo,
  useEffect
} from 'react';

const usePagination = ({ data, tableSize }) => {
  const [index, setIndex] = useState(0);
  const [activePageData, setActivePageData] = useState(
    data.slice(0, tableSize)
  );

  const rowsCount = useMemo(() => data.length, [data]);

  const getNextPage = useCallback(async () => {
    setIndex(index + 1);
  }, [index]);

  const getPrevPage = useCallback(async () => {
    setIndex(index - 1);
  }, [index]);

  const getFirstPage = async () => {
    setIndex(0);
  };

  const getLastPage = async () => {
    setIndex(Math.floor(rowsCount / tableSize));
  };

  const pageNumber = useMemo(() => index + 1, [index]);

  const totalPagesNumber = useMemo(
    () => Math.floor(rowsCount / tableSize) + 1,
    [rowsCount, tableSize]
  );

  useEffect(() => {
    setActivePageData(
      data.slice(index * tableSize, (index + 1) * tableSize)
    );
  }, [index, data, tableSize]);

  const disableNextPageButton = useMemo(
    () => index * tableSize + tableSize >= rowsCount,
    [index, rowsCount, tableSize]
  );
  const disablePrevPageButton = useMemo(() => index <= 0, [
    index
  ]);

  const isFirstPage = useMemo(() => index === 0, [index]);

  const isLastPage = useMemo(
    () => index === Math.floor(rowsCount / tableSize),
    [index, rowsCount, tableSize]
  );

  return {
    activePageData,
    pageNumber,
    totalPagesNumber,
    disableNextPageButton,
    disablePrevPageButton,
    isFirstPage,
    isLastPage,
    getLastPage,
    getFirstPage,
    getPrevPage,
    getNextPage
  };
};

export default usePagination;
