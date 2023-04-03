import classes from './MainCarousel.module.css';

import Slider from "react-slick";

import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import useLoadingStore from '../../../store/loading-store';
import useHttp from '../../hooks/useHttp';
import { formatLoopedItems } from '../../shared/GetMediaFullInfo';
import Timer from './Timer';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${classes.nextButtonSlider}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}
  
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${classes.prevButtonSlider}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}   

const MainCarousel = ({items = []}) => {
  const [tvShows, setTvShows] = useState([]);
  const [finishedMainSeries, isReady] = useLoadingStore((state) => [state.finishedMainSeries, state.isReady]);

  const {sendRequest:fetchTvSeries} = useHttp();

  useEffect(() => {
    const loadedShows = [];
    const loopShows = async () => {
      for(let show of items){ 
        await fetchTvSeries({url:`https://api.simkl.com/tv/${show.ids.simkl_id}/`}, (tvShow) => loadedShows.push(formatLoopedItems(show, tvShow, 'fanart')));
      }
      setTvShows(loadedShows);
      finishedMainSeries();    
    }
    
    loopShows();
  }, []);

  const onButtonClicked = (oEvent) => {
    console.log(oEvent);
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    draggable: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    customPaging: () => (
      <div className={classes.dotSlider} />
    )
    
  };

  if(!isReady()) return <div></div>
    return (
        <div>
          <Slider {...settings} className={classes.sliderContainer}>
              {tvShows.map((card, index) => (
              <div key={index}>
                  <img alt={card.title} src={card.fanart} className={classes['img-responsive']} />
                  {/* <Timer 
                  threshold={2000}
                  imageUrl={card.fanart}
                  videoUrl={card.trailer}
                  title={card.title}
                  fanart={card.fanart}/> */}
                  <div className={classes.carouselImgInfo}>
                    <h2>{card.title}</h2>
                    <h3>NEW EPISODES AVAILABLE</h3>
                    <p>When you're lost in the dark, search for the light.</p>
                    <button type='button' onClick={onButtonClicked}>MORE INFO</button>
                  </div>
                  <div className={classes.bottomGradient} />
              </div>
              ))}              
          </Slider>
        </div>
      )
}

export default MainCarousel;