import './App.css';
import Cart from './components/pages/cart/Cart';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import routes from './router'
import Avatar from './components/pages/avatar/Avatar';


/* // todo
  - Uncomment routes when navigation is set up correctly
*/

function App() {
  return (
    <div className="App">
      <Header />
      <Avatar />
      {routes}
      {/* <Cart /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
