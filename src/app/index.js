import { Text } from '@chakra-ui/react';
import Layout from './layout';
import AppProvider from './provider';
import AppRoutes from './routes';

const App = () => (
  <AppProvider>
    <Layout>
      <Text display="none">Test Render</Text>
      <AppRoutes />
    </Layout>
  </AppProvider>
);

export default App;
