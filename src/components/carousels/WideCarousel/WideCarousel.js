import classes from './WideCarousel.module.css';

import Slider from "react-slick";

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from 'react';


const WideCarousel = (props) => {
    const [trendingTvShows, setTrendingTvShows] = useState([]);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        // getTvShows(); 
        formatTvShows();
    }, [])

    const loadedTrendingTVShows = []; 

    if(props.items.length <= 0) return <div></div>;

    // const getTvShows = () => {
        for (let index = 0; loadedTrendingTVShows.length < 18; index++) {
            
            let randomValue = Math.floor(Math.random() * 49) + 1;
            const element = props.items[randomValue];
            const verifyDuplicates = loadedTrendingTVShows.find(show => {
                return show.ids.simkl_id === props.items[randomValue].ids.simkl_id
            });
            if(!verifyDuplicates){
                loadedTrendingTVShows.push(element);
            }
        }
    // }


    async function formatTvShows() {
        for(let show of loadedTrendingTVShows){
          const fullShowInfo = await fetch(`https://api.simkl.com/tv/${show.ids.simkl_id}/`);
    
          if (!fullShowInfo.ok) {
            throw new Error('Something went wrong!');
          };
    
          const showData = await fullShowInfo.json();
          
          const posterPath = show.poster.split("/");
          
          if(!show.poster.includes('https')){
              show.poster = `https://simkl.in/posters/${posterPath[0]}/${posterPath[1]}_w.jpg`;
          } 
    
          show.title = showData.title;
        }
        setTrendingTvShows(loadedTrendingTVShows);
        setIsValid(true);
    }

    const settings = {
        lazyload: 'progressive',
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        draggable: false,
        responsive: [
            {
              breakpoint: 1500,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
                infinite: true,
                initialSlide: 0
              }
            },
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                initialSlide: 0
              }
            },
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                initialSlide: 0
              }
            },
            {
              breakpoint: 768,
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
    return(
        <>
            <div className={classes.wideCarousel}>
                {isValid && <h2> Trending TV Shows </h2>}
                <Slider {...settings}>
                    {trendingTvShows.map((card, index) => (
                    <div key={index} className={classes['img-container']}>
                        <img alt={card.title} src={card.poster} className={classes['img-carousel']} title={card.title}/>
                    </div>
                    ))}    
                </Slider>
            </div>
        </>
    )
}

export default WideCarousel;