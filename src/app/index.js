import { Grid } from '@chakra-ui/react';
import AppProvider from './provider';
import AppRoutes from './routes';

const App = () => (
  <AppProvider>
    <Grid
      bg="gray.800"
      h="100vh"
      w="100vw"
      overflow="hidden"
      color="gray.50"
    >
      <AppRoutes />
    </Grid>
  </AppProvider>
);

export default App;
