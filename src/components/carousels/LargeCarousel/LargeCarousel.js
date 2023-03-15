import useHttp from '../../hooks/useHttp';
import { useEffect, useState } from 'react';
import classes from './LargeCarousel.module.css';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';
import { formatPosters } from '../../shared/GetMediaFullInfo';

import { shallow } from 'zustand/shallow';
import useLoadingStore from '../../../store/loading-store';

const LargeCarousel = (props) => {
    const [originals, setOriginals] = useState([]);
    const [finishedOriginalShows, isReady] = useLoadingStore(
      (state) => [state.finishedOriginalShows, state.isReady]
      
    );

    const {sendRequest:fetchTvSeries} = useHttp();

    useEffect(() => {
        const loadedOriginals = [];
        const formatTvSeries = (tvShows) => {  
            for(let item of tvShows){
                loadedOriginals.push(formatPosters(item));
            }
            setOriginals(loadedOriginals); 
            finishedOriginalShows(); 
        }    
        fetchTvSeries({url:`https://api.simkl.com/tv/genres/${props.network}`}, formatTvSeries);                  
    }, []);

    const title =   <div className={classes.label}>
                        <h2>{`${props.network} Originals`}</h2>
                        <IonIcon icon={chevronForwardOutline} size='small' className={classes['ion-icon']}/>
                    </div>

    const settings = {
        lazyload: 'progressive',
        dots: false,
        infinite: false,
        slidesToShow: 4,
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
                initialSlide: 0,
                variableWidth: false,
              }
            },
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  infinite: true,
                  initialSlide: 0,
                  variableWidth: false,
                }
              },
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                  initialSlide: 0,
                  variableWidth: false,
                }
              }
        ]
    }

    const content = <div className={classes['large_carousel--container']}>
                        {title}
                        <Slider {...settings}>
                            {originals.map((card, index) => (
                            <div key={index} className={classes['img-container']}>
                                <img alt={card.title} src={card.poster} className={classes['img-carousel']} title={card.title}/>
                            </div>
                            ))}    
                        </Slider>
                    </div>
    
    if (originals.length === 0 || !isReady()) return <div></div>
    else return content;
}

export default LargeCarousel;