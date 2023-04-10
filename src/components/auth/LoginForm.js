import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../hooks/useHttp';
import useInput from '../hooks/useInput';

import classes from './LoginForm.module.css';

import { IonIcon } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import useLoadingStore from '../../store/loading-store';
import ErrorParagraph from '../UI/ErrorParagraph';
import useUserStore from '../../store/user-store';
import CalculateRemainingTime from '../shared/CalculateRemainingTime';

const LoginForm = () => {
    const navigate = useNavigate();

    const {sendRequest:loginUser, error} = useHttp();

    const [setIsLoading] = useLoadingStore(
        (state) => [state.setIsLoading]
      );
    
    const [setToken,
          setisLoggedIn,
          logoutHandler
        ] = useUserStore(
        (state) => [
            state.setToken, 
            state.setisLoggedIn, 
            state.logoutHandler
        ]
    )
      
    const [formIsValid, setFormIsValid] = useState(false);
    

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

    const signUpHandler = () => {
        navigate('/signup');
    } 

    const loginHandler = (data) => {
        const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));      

        setisLoggedIn(true);
        setToken(data.idToken);
        
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('expirationTime', expirationTime.toISOString()); 

        const remainingTime = CalculateRemainingTime(expirationTime);
        setTimeout(logoutHandler, remainingTime);
        navigate('/home');
    }

    const formSubmitHandler = async (oEvent) => {
        oEvent.preventDefault();

        if(!formIsValid) return;

        setIsLoading(true);

        await loginUser({
            url:`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAStn7jrjYy9O2jN_p8Pe9LBXCXxc4NQYQ`,
            method:'POST',
            body: {
                email:emailInputValue,
                password:passwordInputValue,
                returnSecureToken:true
            },
            headers: {
                'Content-Type':'application/json'
              }
        }, loginHandler);

        setIsLoading(false);
        
        emailInputReset();
        passwordInputReset();                
    }

    const emailErrorMessage = <div style={{display:'flex', alignItems:'center'}} className={classes['error-message']}>
                                <IonIcon icon={informationCircleOutline} size='small'/>
                                <p>You must enter an email address.</p>
                              </div>
    const passwordErrorMessage = <div style={{display:'flex', alignItems:'center'}} className={classes['error-message']}>
                                <IonIcon icon={informationCircleOutline} size='small'/>
                                <p>Your password must contain at least 6 characters.</p>
                              </div>

    return(
        <div className={classes.container}>
            <div className={classes['form-container']}>
                <div className={classes.title}>
                    <h2>Sign In</h2>
                </div>
                <div className={classes.card}>
                    <form onSubmit={formSubmitHandler}>
                        <p className={classes['card-message']}>Do you have an HBO Max Account?</p>
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
                        <div className={classes['login-action']}>
                            <button type='submit' disabled={!formIsValid}>SIGN IN</button>
                            <p>Forgot password?</p>
                        </div>
                        <div className={classes.separator}>
                            <div className={classes['separator-left-line']}></div>
                            <div className={classes['separator-text']}>OR</div>
                            <div className={classes['separator-right-line']}></div>
                        </div>
                    </form>
                    <p className={classes['sign-with-provider-message']}>You don't have an HBO Max account yet?</p>
                    <button className={classes['sign-with-provider-button']} onClick={signUpHandler}>SIGN UP</button>
                </div>
                <div className={classes['help-message']}>
                    <p>Need help signing in?</p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;