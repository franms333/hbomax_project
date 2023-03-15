import classes from './WideCarousel.module.css';

import Slider from "react-slick";

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from 'react';

import { IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';
import useHttp from '../../hooks/useHttp';
import transformMedia from '../../shared/NormalizeMedia';
import { formatLoopedItems } from '../../shared/GetMediaFullInfo';

import { shallow } from 'zustand/shallow';
import useLoadingStore from '../../../store/loading-store';


const WideCarousel = (props) => {
    const [trendingTvShows, setTrendingTvShows] = useState([]);
    const [isValid, setIsValid] = useState(false);

    const [
        isReady] = useLoadingStore(
        (state) => [
            state.isReady
        ]
      );

    const {sendRequest:fetchTvSeries} = useHttp();

    const loadedTrendingTVShows = transformMedia(props.items, 18);

    useEffect(() => {
        const loadedShows = [];
        const imageType = props.imageType ? props.imageType : '';

        const loopShows = async () => {
            for(let show of loadedTrendingTVShows){
                await fetchTvSeries({url:`https://api.simkl.com/tv/${show.ids.simkl_id}/`}, (tvShow) => loadedShows.push(formatLoopedItems(show, tvShow, imageType, props.imageSize)));
            } 
            setTrendingTvShows(loadedShows);
            setIsValid(true); 
            props.onFinish();
        }
        
        loopShows();             
    }, []);

    const formattedClasses = props.imageSize === '_ca' ? `${classes['img-carousel']} ${classes['img-carousel-height']}` : `${classes['img-carousel']}`;

    const title =   <div className={classes.label}>
                        <h2>{props.title}</h2>
                        <IonIcon icon={chevronForwardOutline} size='small' className={classes['ion-icon']}/>
                    </div>

    if(!isReady()) return <div></div>;

    return(
        <>
            <div className={`${classes.wideCarousel} ${classes[props.marginTop]}`}>
                {isValid && title}
                <Slider {...props.settings}>
                    {trendingTvShows.map((card, index) => (
                    <div key={index} className={classes['img-container']}>
                        <img alt={card.title} src={props.imageType === 'fanart' ? card.fanart : card.poster} className={formattedClasses} title={card.title}/>
                    </div>
                    ))}    
                </Slider>
            </div>
        </>
    )
}

export default WideCarousel;