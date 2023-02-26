import { useEffect, useState } from 'react';
import WideCarousel from '../../carousels/WideCarousel/WideCarousel';
import classes from './RecentlyAddedMovies.module.css';

const RecentlyAddedMovies = (props) => {
    const [movies, setMovies] = useState([]);

    const fetchMoviesHandler = async () => {
        if(!props.category) return;
        
        const response = await fetch(`https://api.simkl.com/movies/${props.category}/`);
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
    
          const data = await response.json();
    
          setMovies(data);
      };

    useEffect(() => {
        fetchMoviesHandler();
    }, []);

    function _renderWideCarousel() {
        if (movies.length === 0) return <div></div>
        else return  <WideCarousel 
                    items={[...movies]} 
                    title='Recently Added Movies'
                    imageSize='_w'
                    imageType='fanart'
                    imagePerSlide='3'
                    slidestoScroll='3'/>
    }

    return (
        <>
            {_renderWideCarousel()}
        </>
    )
}

export default RecentlyAddedMovies;