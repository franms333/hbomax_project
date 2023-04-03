import classes from './ErrorParagraph.module.css'

import { IonIcon } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';

const ErrorParagraph = (props) => {
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{
        if(props.message === 'INVALID_PASSWORD'){
            setErrorMessage('The password is incorrect. Please try again.')
        } else if(props.message === 'EMAIL_NOT_FOUND'){
            setErrorMessage('The email address is incorrect. Please try again.')
        } else if(props.message === 'EMAIL_EXISTS'){
            setErrorMessage('There is already an user with that email address. Please try using a different one.')
        }
    },[props.message])        

    return(
        <div className={classes.box}>
            <IonIcon icon={informationCircleOutline} size='small'/>
            <p>{errorMessage}</p>
        </div>
    )
}

export default ErrorParagraph;