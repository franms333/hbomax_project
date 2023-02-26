import { useEffect, useState } from 'react';
import WideCarousel from '../../carousels/WideCarousel/WideCarousel';

const SeriesByCategory = (props) => {
    const [trendingTvSeries, setTrendingTvSeries] = useState([]);

    const fetchTVShowsHandler = async () => {
        if(!props.category) return;
        
        const response = await fetch(`https://api.simkl.com/${props.type}/${props.category}/`);
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
    
          const data = await response.json();
    
          setTrendingTvSeries(data);
      };

    useEffect(() => {
        fetchTVShowsHandler();
    }, []);

    function _renderWideCarousel() {
        if (trendingTvSeries.length === 0) return <div></div>
        else return  <WideCarousel 
                    items={[...trendingTvSeries]} 
                    title={props.title} 
                    marginTop={props.marginTop}
                    imageSize={props.size}
                    imagePerSlide={props.imagePerSlide}/>
    }

    return(
        <>
            {_renderWideCarousel()}
        </>
    )
}

export default SeriesByCategory;