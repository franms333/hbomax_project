import './App.css';
import MainCarousel from './components/carousels/MainCarousel';
import Header from './components/layout/Header';

function App() {
  
  return (
    <>
      <Header />
      <MainCarousel />
      <div className='topGradient'></div>
    </>
  );
}

export default App;
