import { useEffect, useState } from 'react';
import './App.css';
import LargeCarousel from './components/carousels/LargeCarousel/LargeCarousel';
import MainCarousel from './components/carousels/MainCarousel/MainCarousel';
import WideCarousel from './components/carousels/WideCarousel/WideCarousel';
import Header from './components/layout/Header';

function App() {
  const [tvSeries, setTvSeries] = useState([]);
  const [trendingTvSeries, setTrendingTvSeries] = useState([]);

  const fetchTVShowsHandler = async () => {
    const response = await fetch('https://api.simkl.com/tv/trending/');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedTVSeries = [];

      for (let index = 0; loadedTVSeries.length < 7; index++) {
        let randomValue = Math.floor(Math.random() * 49) + 1;
        const element = data[randomValue];
        const verifyDuplicates = loadedTVSeries.find(show => show.ids.simkl_id === data[randomValue].ids.simkl_id);
        if(!verifyDuplicates){
          loadedTVSeries.push(element);
        }
      }
      setTvSeries(loadedTVSeries); 
      setTrendingTvSeries(data);
  };

  useEffect(() => {
    fetchTVShowsHandler();
  }, []);

  function _renderMainCarousel() {
    if (tvSeries.length === 0) return <div></div>
    else return  <MainCarousel items={tvSeries}/>
  }

  function _renderWideCarousel() {
    if (tvSeries.length === 0) return <div></div>
    else return  <WideCarousel items={[...trendingTvSeries]}/>
  }
  
  return (
    <> 
      <Header />
      <main>
        {_renderMainCarousel()}
        <div className='topGradient'></div>
        {_renderWideCarousel()}
        <LargeCarousel 
        network='HBO'/>
      </main>
    </>
  );
}

export default App;
