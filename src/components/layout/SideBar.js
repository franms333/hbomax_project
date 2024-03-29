import classes from './SideBar.module.css';

import { IonIcon } from '@ionic/react';
import { chevronForwardOutline, closeOutline } from 'ionicons/icons';
import batmanLogo from '../../shared/batman_icon.png';
import cartoonNetworkLogo from '../../shared/cartoon_network_icon.png';
import hboLogo from '../../shared/hbo_icon.png';
import hboMaxLogo from '../../shared/hbo_max_icon.png';
import warnerBrosLogo from '../../shared/warner_bros_icon.png';
import useLoadingStore from '../../store/loading-store';
import { useState } from 'react';

import 'animate.css'

const SideBar = () => {
    const [cssClasses, setCssClasses] = useState(`${classes.containter} animate__animated animate__fadeInLeft`)
    const [setShowMenu] = useLoadingStore(
        (state) => [state.setShowMenu]
    );    


    const closeMenuHandler = () => {
        setCssClasses(`${classes.containter} animate__animated animate__fadeOutLeft`)
        setTimeout(()=>{
            setShowMenu(false);
        }, 500)
        
    }

    return (
        <>
            <div className={classes.backdrop} onClick={closeMenuHandler} />
            <div className={cssClasses}>
                <IonIcon 
                icon={closeOutline} 
                size='large' 
                className={classes['close-button']}
                onClick={closeMenuHandler}/>
                <ul>
                    <li>Home</li>
                    <li>Series</li>
                    <li>Movies</li>
                    <li>Originals</li>
                    <li>Just Added</li>
                    <li>Last Chance</li>
                    <li>Coming Soon</li>
                    <li>Trending Now</li>
                    <li>Watch Free</li>
                </ul>
                <hr />
                <div className={classes['genre-container']}>
                    <p>Genres</p>
                    <IonIcon icon={chevronForwardOutline} size='small' />
                </div>
                <hr />
                <div className={classes['brands-container']}>
                    <img src={hboLogo} alt='HBO Logo'/>
                    <img src={hboMaxLogo} alt='HBO Max Logo'/>
                    <img src={warnerBrosLogo} alt='Warner Brothers Logo'/>
                    <img src={batmanLogo} alt='Batman Logo'/>
                    <img src={cartoonNetworkLogo} alt='Cartoon Network Logo'/>
                </div>
            </div>
        </>
    )
}

export default SideBar;