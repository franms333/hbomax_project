import './App.css';
import Header from './components/layout/Header';
import RecentlyAddedMovies from './components/trending/movies/RecentlyAddedMovies';
import MainSeries from './components/trending/series/MainSeries';
import OriginalSeries from './components/trending/series/OriginalSeries';
import SeriesByCategory from './components/trending/series/SeriesByCategory';

function App() {
  
  return (
    <> 
      <Header />
      <main>
        <MainSeries />
        <div className='topGradient'></div>
        <SeriesByCategory 
        type='tv'
        category='trending'
        title='Trending TV Shows'
        marginTop='overlayMarginTop'
        size='_w'
        imagePerSlide='6'/>
        <OriginalSeries />
        <SeriesByCategory 
        type='anime'
        category='trending'
        title='Anime'
        size='_ca'
        imagePerSlide='9'/>
        
        <RecentlyAddedMovies 
        category='trending'/>
      </main>
    </>
  );
}

export default App;
