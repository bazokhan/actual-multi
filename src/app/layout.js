import { Grid } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <Grid
    h="100vh"
    w="100vw"
    overflow="hidden"
    alignItems="start"
    alignContent="start"
  >
    {children}
  </Grid>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
