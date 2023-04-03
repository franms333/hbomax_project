import { useEffect, useState } from 'react';
import classes from './Timer.module.css'

const Timer = (props) => {
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    let videoUrl;

    useEffect(() => {
        let intervalId;
    
        if (isTimerRunning && elapsedTime < props.threshold) {
          intervalId = setInterval(() => {
            setElapsedTime(prevElapsedTime => prevElapsedTime + 1000);
          }, 1000);
        }
    
        return () => clearInterval(intervalId);
      }, [isTimerRunning, elapsedTime, props.threshold]);

      useEffect(() => {
        if (elapsedTime >= props.threshold) {
          setIsTimerRunning(false);
        }
      }, [elapsedTime, props.threshold]);

      useEffect(()=>{
        const getYoutubeVideoId = async (url) => {
            try {
                
                const response = await fetch(url);
                const html = await response.text();
                console.log(html)
                const match = html.match(/(?:youtube.com\/embed\/)([\w-]+)/);
                if (match) {
                  return match[1];
                } else {
                  console.log("Embedded YouTube video not found on page");
                  return null;
                }
              } catch (error) {
                console.error("Error fetching page content:", error);
                return null;
              }
        }

        videoUrl = getYoutubeVideoId(props.videoUrl);
      },[props.videoUrl])

      function handleImageHover() {
        setIsTimerRunning(true);
      }

    return (
        <>
        <div onMouseEnter={handleImageHover}>
          {elapsedTime < props.threshold ? (
            <img alt={props.title} src={props.fanart} className={classes['img-responsive']} />
          ) : (
            <iframe title={props.title} src={videoUrl} className={classes['img-responsive']} controls autoPlay />
          )}
        </div>
        {isTimerRunning && (
          <p>
            Time elapsed: {Math.floor(elapsedTime / 1000)} seconds
          </p>
        )}
      </>
    )
}

export default Timer;