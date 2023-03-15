import { useEffect, useState } from 'react';
import WideCarousel from '../../carousels/WideCarousel/WideCarousel';
import useHttp from '../../hooks/useHttp';

const RecentlyAddedMovies = (props) => {
    const [movies, setMovies] = useState([]);

    const {sendRequest:fetchMovies} = useHttp();
    
      useEffect(() => {
        const transformMovies = (movies) => {
          setMovies(movies);
      }
      fetchMovies({url:`https://api.simkl.com/movies/${props.category}/month`}, transformMovies);
      }, []);
    
    let settings = {
      lazyload: 'progressive',
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      draggable: false,
      responsive: [
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              initialSlide: 0
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              initialSlide: 0
            }
          }
        ]
    };
    function _renderWideCarousel() {
        if (movies.length === 0) return <div></div>
        else return  <WideCarousel 
                    items={[...movies]} 
                    title='Recently Added Movies'
                    imageSize='_w'
                    imageType='fanart'
                    imagePerSlide='3'
                    slidestoScroll='3'
                    settings={settings}
                    onFinish={props.onFinish}/>
    }

    return (
        <>
            {_renderWideCarousel()}
        </>
    )
}

export default RecentlyAddedMovies;