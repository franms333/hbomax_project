import { useEffect, useState } from 'react';
import WideCarousel from '../../carousels/WideCarousel/WideCarousel';
import useHttp from '../../hooks/useHttp';

const SeriesByCategory = (props) => {
    const [trendingTvSeries, setTrendingTvSeries] = useState([]);

    const {sendRequest:fetchTvShows} = useHttp();

    useEffect(() => {
      fetchTvShows({url:`https://api.simkl.com/${props.type}/${props.category}/`}, (tvShows) => setTrendingTvSeries(tvShows))
    }, [])
    
    let settings = {};
    if(props.imagePerSlide){    
        switch (props.imagePerSlide) {
            case '6':
                settings = {
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
            break;
            case '9':
                settings = {
                    lazyload: 'progressive',
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 9,
                    slidesToScroll: 9,
                    initialSlide: 0,
                    draggable: false,
                    responsive: [
                        {
                          breakpoint: 1400,
                          settings: {
                            slidesToShow: 6,
                            slidesToScroll: 6,
                            infinite: true,
                            initialSlide: 0
                          }
                        },
                        {
                          breakpoint: 1000,
                          settings: {
                            slidesToShow: 5,
                            slidesToScroll: 5,
                            infinite: true,
                            initialSlide: 0
                          }
                        },
                        {
                          breakpoint: 768,
                          settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                            infinite: true,
                            initialSlide: 0
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            initialSlide: 0
                          }
                        }
                      ]
                };
            break;

            default:
            break;
        }
    }

    function _renderWideCarousel() {
        if (trendingTvSeries.length === 0) return <div></div>
        else return  <WideCarousel 
                    items={[...trendingTvSeries]} 
                    title={props.title} 
                    marginTop={props.marginTop}
                    imageSize={props.size}
                    imagePerSlide={props.imagePerSlide}
                    settings={settings}
                    onFinish={props.onFinish}/>
    }

    return(
        <>
            {_renderWideCarousel()}
        </>
    )
}

export default SeriesByCategory;