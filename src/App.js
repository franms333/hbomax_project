import './App.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import LoginForm from './components/auth/LoginForm';
import SignUp from './components/auth/SignUp';
import RecentlyAddedMovies from './components/trending/movies/RecentlyAddedMovies';
import MainSeries from './components/trending/series/MainSeries';
import OriginalSeries from './components/trending/series/OriginalSeries';
import SeriesByCategory from './components/trending/series/SeriesByCategory';

import LoadingSpinner from './components/UI/LoadingSpinner';
import useLoadingStore from './store/loading-store';

import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import LoadingOverlayWrapper from 'react-loading-overlay-ts';
import SideBar from './components/layout/SideBar';

function App() {
  const path = useLocation().pathname;

  const [finishedTrendingShows, 
         finishedAnimeShows, 
         finishedRecentMovies,
         isReady,
         isLoading,
         showMenu] = useLoadingStore(
    (state) => [
                state.finishedTrendingShows,
                state.finishedAnimeShows,
                state.finishedRecentMovies,
                state.isReady,
                state.isLoading,
                state.showMenu
              ]
  );

  const bg_image = path === '/signup' ? 'signup_bg' : 'default_bg';
  const mainClasses = !isReady() ? 'loading_bg' : '';

  const loginPageContent = <LoadingOverlayWrapper
                            active={isLoading}
                            spinner={<LoadingSpinner/>}
                            >
                              <div className='card-container'>
                                <LoginForm />
                              </div>
                            </LoadingOverlayWrapper>
                            
  const signUpPageContent = <LoadingOverlayWrapper
                            active={isLoading}
                            spinner={<LoadingSpinner/>}
                            >
                              <div className='card-container'>
                                <SignUp />
                              </div>
                            </LoadingOverlayWrapper>
  const homePageContent = <>
                            <LoadingOverlayWrapper
                            active={!isReady()}
                            spinner={<LoadingSpinner/>}
                            >
                              <main className={mainClasses}>
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
                                <Footer />
                              </main>
                            </LoadingOverlayWrapper>
                          </>

  
  
  return (
      <div className={bg_image} style={{position:'relative'}}>
        <Header />

        {showMenu && <SideBar />}
        <Routes>
          <Route path='/' element={<Navigate replace to={'/login'}/>} />

          <Route path='/login' element={loginPageContent}/>

          <Route path='/signup' element={signUpPageContent}/>

          <Route path='/home' element={homePageContent}/>
          
        </Routes>
      </div>
  );
}

export default App;
