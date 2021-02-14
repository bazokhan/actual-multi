import {
  Box,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorMode
} from '@chakra-ui/react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react';
import ReportWizard from '../../../components/ReportWizard';
import TransactionsTable from '../../../components/TransactionsTable';
import ReportStore from '../../../stores/ReportStore';
import TransactionsReport from '../../../components/TransactionsReport';

const reportStore = ReportStore.create({ id: uuid() });

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onConfirm = async ({
    loading: lazyLoading,
    error: lazyError
  }) => {
    setLoading(lazyLoading);
    setError(lazyError);
  };
  const onCancel = () => {};
  const { colorMode } = useColorMode();

  return (
    <Grid
      gridTemplateColumns="auto 1fr auto"
      height="100%"
      overflow="hidden"
      columnGap="30px"
    >
      <Modal
        isOpen={
          reportStore.activeTransactions?.sortedItems
            ?.length
        }
        onClose={() =>
          reportStore.activeTransactions?.updateItems([])
        }
      >
        <ModalOverlay />
        <ModalContent
          maxWidth="80vw"
          minWidth="80vw"
          maxHeight="80vh"
          minHeight="80vh"
          margin="auto"
          overflow="auto"
        >
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody
            bg={colorMode === 'light' ? 'bg.200' : 'bg.800'}
          >
            <TransactionsTable
              store={reportStore.activeTransactions}
              tableSize={20}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box
        width="100%"
        height="100%"
        minWidth="600px"
        borderColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderWidth="1px"
        overflow="auto"
      >
        {Array.isArray(reportStore.chunked) ? (
          <TransactionsReport reportStore={reportStore} />
        ) : (
          <Flex
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            Report will appear here
          </Flex>
        )}
      </Box>
      <Box
        width="100%"
        height="100%"
        borderColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderWidth="1px"
        overflow="auto"
      >
        {reportStore.transactions.sortedItems.length ? (
          <TransactionsTable
            store={reportStore.transactions}
            loading={loading}
            error={error}
            tableSize={20}
          />
        ) : (
          <Flex
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            Transactions Table will appear here
          </Flex>
        )}
      </Box>
      <ReportWizard
        store={reportStore}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </Grid>
  );
};

export default observer(Create);
