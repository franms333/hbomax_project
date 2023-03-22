import './App.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Login from './components/SignIn/Login';
import RecentlyAddedMovies from './components/trending/movies/RecentlyAddedMovies';
import MainSeries from './components/trending/series/MainSeries';
import OriginalSeries from './components/trending/series/OriginalSeries';
import SeriesByCategory from './components/trending/series/SeriesByCategory';

import LoadingSpinner from './components/UI/LoadingSpinner';
import useLoadingStore from './store/loading-store';

import {Redirect, Route, Switch} from 'react-router-dom';

function App() {
  const [finishedTrendingShows, 
         finishedAnimeShows, 
         finishedRecentMovies] = useLoadingStore(
    (state) => [
                state.finishedTrendingShows,
                state.finishedAnimeShows,
                state.finishedRecentMovies]
  );
  
  return (
    <>
        <Header />
        <Switch>
          <Route path='/' exact>
            <Redirect to='/login' />
          </Route>

          <Route path='/login'>
            <div className='card-container'>
              <Login />
            </div>
          </Route>

          <Route path='/home'>
            <LoadingSpinner />
            <main>
              <MainSeries />
              <div className='topGradient' />
              <SeriesByCategory 
              type='tv'
              category='trending'
              title='Trending TV Shows'
              marginTop='overlayMarginTop'
              size='_w'
              imagePerSlide='6'
              onFinish={finishedTrendingShows}/>
              <OriginalSeries/>
              <SeriesByCategory 
              type='anime'
              category='trending'
              title='Anime'
              size='_ca'
              imagePerSlide='9'
              onFinish={finishedAnimeShows}/>
              
              <RecentlyAddedMovies 
              type='movie'
              category='trending'
              onFinish={finishedRecentMovies}/>
            </main>
            
            <Footer />
          </Route>
          
        </Switch>
      </>
  );
}

export default App;
