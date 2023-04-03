import { IonIcon } from '@ionic/react';
import { menuOutline, searchOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import brandLogo from '../../shared/brand-logo.png';
import useLoadingStore from '../../store/loading-store';
import classes from './Header.module.css';

const Header = () => {
    const [navbar, setNavbar] = useState(false);
    const [setShowMenu] = useLoadingStore(
        (state) => [state.setShowMenu]
    );

    const changeBackground = () => {
        if (window.scrollY >= 450) {
          setNavbar(true)
        } else {
          setNavbar(false)
        }
      }
    
    useEffect(() => {
        changeBackground()
        // adding the event when scroll change background
        window.addEventListener("scroll", changeBackground);
    }, [])

    const showMenuHandler = () => {
        setShowMenu(true);
    }

    const headerClasses = navbar ? `${classes.header} ${classes['header-color']}` : `${classes.header}`;

    return (
        <header className={headerClasses}>
            <nav className={classes.leftNavbarItems}>
                <IonIcon icon={menuOutline} size='large' className={classes.menu} onClick={showMenuHandler}/>
                <a href='#' className={classes.headerLinkTabs}>Movies</a>
                <a href='#' className={classes.headerLinkTabs}>Series</a>
            </nav>
            <div>
                <img className={classes.logo} src={brandLogo} alt="HBOMax Logo" />
            </div>
            <div className={classes.rightNavbarItems}>
                <IonIcon id={classes.searchIcon} icon={searchOutline} className={classes.searchBar}/>
                <div className={classes.userItems}>
                    <div className={classes.userAvatar}>
                        <p>K</p>
                    </div>
                    <p id={classes.username} className={classes.username}>Kriet</p>
                </div>
            </div>
        </header>
    )
}

export default Header; 