import classes from './MainCarousel.module.css'

import Slider from "react-slick";

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const hotelCards = [
    {
      imageSrc:
        'https://www.bt.com/content/dam/bt/portal/images/articles/tv/tv-drama-the-last-of-us-key-art-now-sky-atlantic.jpg',
      title: 'Studio Room',
      description: 'Lorem ipsum dolor sit amet, consectur dolori',
      pricingText: 'USD 50/Day',
      features: ['Free Wifi', 'Free breakfast'],
    },
    {
      imageSrc:
        'https://static.dw.com/image/62850747_1006.jpg',
      title: 'Deluxe Room',
      description: 'Lorem ipsum dolor sit amet, consectur dolori',
      pricingText: 'USD 80/Day',
      features: ['Free Wifi', 'Free breakfast'],
    },
    {
      imageSrc:
        'https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/4909/474909-h',        
      title: 'King Deluxe Room',
      description: 'Lorem ipsum dolor sit amet, consectur dolori',
      pricingText: 'USD 150/Day',
      features: ['Free Wifi', 'Free breakfast', 'Discounted Meals'],
    },
    {
      imageSrc:
        'https://cdn.alza.cz/Foto/ImgGalery/Image/harry-potter-serial-hbo-navrat-do-bradavic.jpg',
      title: 'Royal Suite',
      description: 'Lorem ipsum dolor sit amet, consectur dolori',
      pricingText: 'USD 299/Day',
      features: [
        'Free Wifi',
        'Free breakfast',
        'Discounted Meals',
        "MacBook for work use (hotel's property)",
      ],
    },
  ]

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

const MainCarousel = () => {

  const onButtonClicked = (oEvent) => {
    console.log(oEvent);
  }

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: dots => (
          <div
            style={{
              paddingBottom: "4rem",
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
              {hotelCards.map((card, index) => (
              <div key={index}>
                  <img alt={card.title} src={card.imageSrc} className={classes['img-responsive']} />
                  <div className={classes.carouselImgInfo}>
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