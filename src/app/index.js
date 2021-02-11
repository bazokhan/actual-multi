import Layout from './layout';
import AppProvider from './provider';
import AppRoutes from './routes';

const App = () => (
  <AppProvider>
    <Layout>
      <AppRoutes />
    </Layout>
  </AppProvider>
);

export default App;
