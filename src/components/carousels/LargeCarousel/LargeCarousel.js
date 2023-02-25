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

    const settings = {
        lazyload: 'progressive',
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        draggable: false,
        variableWidth: true
    }
    return (
        <>
            <div className={classes['large_carousel--container']}>
                {<h2>{`${props.network} Originals`}</h2>}
                <Slider {...settings}>
                    {originals.map((card, index) => (
                    <div key={index} className={classes['img-container']}>
                        <img alt={card.title} src={card.poster} className={classes['img-carousel']} title={card.title}/>
                    </div>
                    ))}    
                </Slider>
            </div>
        </>
    )
}

export default LargeCarousel;