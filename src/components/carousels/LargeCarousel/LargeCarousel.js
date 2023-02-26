import { useState } from 'react';
import classes from './LargeCarousel.module.css';

import Slider from "react-slick";

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const LargeCarousel = (props) => {
    const [originals, setOriginals] = useState([]);

    const fetchOriginalsHandler = async () => {
        const response = await fetch(`https://api.simkl.com/tv/genres/${props.network}`);

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const data = await response.json();

        for(let item of data){
            
            const posterPath = item.poster.split("/");
            
            if(!item.poster.includes('https')){
                item.poster = `https://simkl.in/posters/${posterPath[0]}/${posterPath[1]}_m.jpg`;
            } 
        }

        setOriginals(data);
    }

    useState(()=>{
        fetchOriginalsHandler();
    }, []);

    function _renderLargeCarousel() {
        if (originals.length === 0) return <div></div>
        else return content;
    }

    const settings = {
        lazyload: 'progressive',
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        draggable: false,
        variableWidth: true,
        responsive: [
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                initialSlide: 0
              }
            }
        ]
    }

    const content = <div className={classes['large_carousel--container']}>
                        {<h2>{`${props.network} Originals`}</h2>}
                        <Slider {...settings}>
                            {originals.map((card, index) => (
                            <div key={index} className={classes['img-container']}>
                                <img alt={card.title} src={card.poster} className={classes['img-carousel']} title={card.title}/>
                            </div>
                            ))}    
                        </Slider>
                    </div>
    return (
        <>
            {_renderLargeCarousel()}
        </>
    )
}

export default LargeCarousel;