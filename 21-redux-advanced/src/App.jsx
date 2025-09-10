import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const isToggled = useSelector(state => state.cart.isToggled);
  return (
    <Layout>
      {isToggled && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
