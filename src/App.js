import './App.css';
import Cart from './components/pages/cart/Cart';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import routes from './router'


/* // todo
  - Uncomment routes when navigation is set up correctly
*/

function App() {
  return (
    <div className="App">
      <Header />
      {routes}
      {/* <Cart /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
