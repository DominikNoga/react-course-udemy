import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useUpdateCartData } from './hooks/useUpdateCartData';
import { useGetCartData } from './hooks/useGetCartData';

function App() {
  useUpdateCartData();
  useGetCartData();
  const notification = useSelector(state => state.ui.notification);
  const isCartToggled = useSelector(state => state.ui.isCartToggled);

  return (
    <>
      {notification && <Notification {...notification} />}
      <Layout>
        {isCartToggled && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
