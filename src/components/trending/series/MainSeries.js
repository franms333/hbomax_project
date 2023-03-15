import { useEffect, useState } from 'react';
import MainCarousel from '../../carousels/MainCarousel/MainCarousel';
import useHttp from '../../hooks/useHttp';
import transformMedia from '../../shared/NormalizeMedia';

const MainSeries = () => {
    const [tvSeries, setTvSeries] = useState([]);

    const {sendRequest:fetchTvSeries} = useHttp();    
      useEffect(() => {        
        fetchTvSeries({url:'https://api.simkl.com/tv/trending/'},(series) => setTvSeries(transformMedia(series)));
      }, []);
    
    if (tvSeries.length === 0) return <div></div>
    else return <MainCarousel items={tvSeries}/>
}

export default MainSeries;