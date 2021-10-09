import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import routes from './router'
import AvatarDisplay from './components/pages/avatar/AvatarDisplay';

function App() {
  return (
    <div className="App">
      <Header />
      <AvatarDisplay />
      {routes}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
