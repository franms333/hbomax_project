import classes from './Footer.module.css';

import { IonIcon } from '@ionic/react';
import { logoYoutube, logoTwitter, logoFacebook, logoInstagram } from 'ionicons/icons';

import { shallow } from 'zustand/shallow';
import useLoadingStore from '../../store/loading-store';

const Footer = () => {
    const [isReady] = useLoadingStore(
        (state) => [state.isReady]
      );

    if(!isReady()) return <div></div>;
    return (
        <div className={classes.footer}>
            <div className={classes['rights-message']}>
                <p>&copy; 2023 WarnerMedia Direct, LLC. All rights reserved.</p>
            </div>
            <div className={classes['bottom-footer']}>
                <div className={classes['social-media']}>
                    <IonIcon icon={logoYoutube} size='small' className={classes.icon}/>
                    <IonIcon icon={logoTwitter} size='small' className={classes.icon}/>
                    <IonIcon icon={logoFacebook} size='small' className={classes.icon}/>
                    <IonIcon icon={logoInstagram} size='small' className={classes.icon}/>
                </div>
                <div className={classes['links-container']}>
                    <p className={classes.link}>Privacy</p>
                    <p className={classes.link}>Terms</p>
                    <p className={classes.link}>Help</p>
                    <p className={classes.link}>Devices</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;