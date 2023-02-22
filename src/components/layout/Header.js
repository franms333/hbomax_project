import classes from './Header.module.css';
import { IonIcon } from '@ionic/react';
import { menuOutline, searchOutline } from 'ionicons/icons';
import brandLogo from '../../shared/brand-logo.png'

const Header = () => {

    return (
        <header className={classes.header}>
            <nav className={classes.leftNavbarItems}>
                <IonIcon icon={menuOutline} size='large' className={classes.menu}/>
                <a href='#' className={classes.headerLinkTabs}>Movies</a>
                <a href='#' className={classes.headerLinkTabs}>Series</a>
            </nav>
            <div>
                <img className={classes.logo} src={brandLogo} alt="HBOMax Logo" />
            </div>
            <div className={classes.rightNavbarItems}>
                <IonIcon icon={searchOutline} className={classes.searchBar}/>
                <div className={classes.userItems}>
                    <div className={classes.userAvatar}>
                        <p>K</p>
                    </div>
                    <p className={classes.username}>Kriet</p>
                </div>
            </div>
        </header>
    )
}

export default Header; 