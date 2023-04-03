import classes from './SignUp.module.css';
import { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import {useNavigate} from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import useHttp from '../hooks/useHttp';
import useLoadingStore from '../../store/loading-store';
import ErrorParagraph from '../UI/ErrorParagraph';

const SignUp = () => {
    const navigate = useNavigate();
    const {sendRequest:registerUser, error} = useHttp();
    const [formIsValid, setFormIsValid] = useState(false);
    const [isLoading, setIsLoading] = useLoadingStore(
        (state) => [state.isLoading,state.setIsLoading]
      );

    const {
    value: emailInputValue,
    isValid: emailInputIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailInputReset
    } = useInput((value) => value.includes('@'));
    const {
    value: passwordInputValue,
    isValid: passwordInputIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordInputReset
    } = useInput((value) => value.length > 5);

    useEffect(()=> {
        if(emailInputIsValid && passwordInputIsValid){
          setFormIsValid(true)
        } else {
          setFormIsValid(false)
        }
        
      }, [emailInputIsValid, passwordInputIsValid, navigate]);

    const emailInputClasses = emailInputHasError ? `${classes.invalid}` : '';
    const passwordInputClasses = passwordInputHasError ? `${classes.invalid}` : '';

    const onSignUp = (data) => {
        navigate('/login'); 
    }

    const formSubmitHandler = async (oEvent) => {
        oEvent.preventDefault();

        if(!formIsValid) return;     
        
        setIsLoading(true);
        
        await registerUser({
            url:`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAStn7jrjYy9O2jN_p8Pe9LBXCXxc4NQYQ`,
            method:'POST',
            body: {
                email:emailInputValue,
                password:passwordInputValue,
                returnSecureToken:true
            },
            headers: {
                'Content-Type':'application/json'
              }
        }, onSignUp);

        setIsLoading(false);

        emailInputReset();
        passwordInputReset();
    }

    const emailErrorMessage =   <div style={{display:'flex', alignItems:'center'}} className={classes['error-message']}>
                                    <IonIcon icon={informationCircleOutline} size='small'/>
                                    <p>You must enter an email address.</p>
                                </div>
    const passwordErrorMessage = <div style={{display:'flex', alignItems:'center'}} className={classes['error-message']}>
                                    <IonIcon icon={informationCircleOutline} size='small'/>
                                    <p>Your password must contain at least 6 characters.</p>
                                 </div>

    return(
        <div className={classes.container}>            
            <div className={classes.card}>
                <div className={classes.title}>
                    <h2>Sign Up</h2>
                </div>
                <form onSubmit={formSubmitHandler}>
                    <p className={classes['card-message']}>Please fill the following info:</p>
                    {error && <ErrorParagraph message={error}/>}
                    <input
                    type='email'
                    name='email'
                    placeholder='Email Address'
                    className={emailInputClasses}
                    value={emailInputValue}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}/>
                    {emailInputHasError && emailErrorMessage}
                    <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    className={passwordInputClasses}
                    value={passwordInputValue}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}/>
                    {passwordInputHasError && passwordErrorMessage}
                    <div className={classes['signup-action']}>
                        <button type='submit' disabled={!formIsValid}>SIGN UP</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;