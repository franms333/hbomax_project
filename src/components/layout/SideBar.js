import classes from './SideBar.module.css'

import { IonIcon } from '@ionic/react';
import { closeOutline, chevronForwardOutline } from 'ionicons/icons';
import hboLogo from '../../shared/hbo_icon.png';
import hboMaxLogo from '../../shared/hbo_max_icon.png';
import warnerBrosLogo from '../../shared/warner_bros_icon.png';
import batmanLogo from '../../shared/batman_icon.png';
import cartoonNetworkLogo from '../../shared/cartoon_network_icon.png';
import useLoadingStore from '../../store/loading-store';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

const SideBar = () => {
    const [setShowMenu] = useLoadingStore(
        (state) => [state.setShowMenu]
    );    

    const closeMenuHandler = () => {
        setShowMenu(false);
    }

    return (
        <>
            <div className={classes.backdrop} onClick={closeMenuHandler} />
            <div className={classes.containter}>
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