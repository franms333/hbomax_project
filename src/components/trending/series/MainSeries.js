import { useEffect, useState } from 'react';
import MainCarousel from '../../carousels/MainCarousel/MainCarousel';

const MainSeries = () => {
    const [tvSeries, setTvSeries] = useState([]);

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
      };
    
      useEffect(() => {
        fetchTVShowsHandler();
      }, []);

      function _renderMainCarousel() {
        if (tvSeries.length === 0) return <div></div>
        else return  <MainCarousel items={tvSeries}/>
      }
    
    
    return(
        <>
            {_renderMainCarousel()}
        </>
    )
}

export default MainSeries;