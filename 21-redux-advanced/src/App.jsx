import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useCartData } from './hooks/useCartData';

function App() {
  const { isToggled } = useCartData();
  // const notification = useSelector(state => state.ui.notification);

  return (
    <>
      <Layout>
        {isToggled && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
