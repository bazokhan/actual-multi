import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Box, Divider, Flex, Grid } from '@chakra-ui/react';
import ChunkSum from './ChunkSum';

const Chunk = ({ chunk, parents, mode, store }) => {
  const total = (chunk.sum / 100).toFixed(2);
  const gridProps =
    mode === 'grid'
      ? {
          gridTemplateColumns: '200px 1fr',
          columnGap: '10px',
          borderBottomColor: 'white',
          borderBottomWidth: '1px'
        }
      : {
          gridTemplateRows: 'auto 1fr',
          rowGap: '10px',
          marginLeft: '60px'
        };
  return chunk.chunked === 'Complete' ? (
    <Box marginLeft="60px">
      <ChunkSum chunk={chunk} total={total} store={store} />
    </Box>
  ) : (
    <Grid {...gridProps}>
      <ChunkSum chunk={chunk} total={total} store={store} />
      <Divider />
      <Flex direction="column" marginBottom="10px">
        {chunk.chunked?.map(c => (
          <Chunk
            chunk={c}
            store={store}
            key={[...parents, c.identifier.id].join(',')}
            parents={[...parents, c.identifier.id]}
          />
        ))}
      </Flex>
    </Grid>
  );
};

Chunk.propTypes = {
  chunk: PropTypes.object.isRequired,
  parents: PropTypes.array.isRequired,
  store: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['grid', 'lines'])
};

Chunk.defaultProps = {
  mode: 'lines'
};

export default observer(Chunk);
