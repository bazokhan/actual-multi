import { Grid } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Chunk from './Chunk';

const TransactionsReport = ({ reportStore }) => (
  <Grid
    height="100%"
    minWidth="600px"
    overflow="auto"
    alignContent="start"
  >
    {reportStore.chunked === 'Complete'
      ? null
      : reportStore.chunked?.map(chunk => (
          <Chunk
            key={chunk.identifier.id}
            parents={[chunk.identifier.id]}
            store={reportStore}
            chunk={chunk}
          />
        ))}
  </Grid>
);

TransactionsReport.propTypes = {
  reportStore: PropTypes.object.isRequired
};

export default observer(TransactionsReport);
