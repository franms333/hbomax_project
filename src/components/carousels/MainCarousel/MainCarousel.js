import classes from './MainCarousel.module.css'

import Slider from "react-slick";

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    formatItems();
  });

  if(items.length <= 0) return <div></div>;

  async function formatItems() {
    for(let show of items){
      const fullShowInfo = await fetch(`https://api.simkl.com/tv/${show.ids.simkl_id}/`);

      if (!fullShowInfo.ok) {
        throw new Error('Something went wrong!');
      };

      const showData = await fullShowInfo.json();
      const fanartPath = show.fanart.split("/");
    
      if(!show.fanart.includes('https')){
      show.fanart = `https://simkl.in/fanart/${fanartPath[0]}/${fanartPath[1]}_medium.jpg`;
      }

      show.title = showData.title;
    }
    setTvShows(items);
  }

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
    appendDots: dots => (
      <div
        style={{
          paddingLeft: '4rem',
          zIndex: 2,
        }}
      >
        <ul> {dots.map((item, index) => {
          return (
            <li key={index} className={item.props.className}>{item.props.children}</li>
          )
        })} </ul>
      </div>
    ),
    customPaging: () => (
      <div className={classes.dotSlider}>
      </div>
    )
    
  };
    return (
        <div>
          <Slider {...settings} className={classes.sliderContainer}>
              {tvShows.map((card, index) => (
              <div key={index}>
                  <img alt={card.title} src={card.fanart} className={classes['img-responsive']} />
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